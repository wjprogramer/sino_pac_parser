import * as fs from "fs";
import {getInputFolderPath} from "@src/utils/fs";
import {PdfFile} from "@src/types";
import path from "path";
import pdfParse from "pdf-parse";
import {execSync} from "child_process";
import {TradeRecord} from "@src/database/entities";

export const getAllInputPdfFiles = (): PdfFile[] => {
    const inputFolderPath = getInputFolderPath();
    const paths = fs.readdirSync(inputFolderPath);
    return paths
        .filter((e) => e.endsWith('.pdf'))
        .map((fileName) => {
            return {
                baseName: path.parse(fileName).name,
                fileName: fileName,
                completeAddress: path.join(inputFolderPath, fileName),
                parent: inputFolderPath,
            };
        });
}

export const decryptPdf = (options: {
    fileName: string,
    password: string,
}) => {
    const baseFileName = path.parse(options.fileName).name;
    const command = `qpdf --decrypt --password=${options.password} "./input/${options.fileName}" "./input/${baseFileName}.decrypt.pdf"`;
    console.log(command);
    execSync(command);
}

export const parsePdf = async (pdfFile: PdfFile) => {
    const decryptPath = path.join(
        pdfFile.parent,
        `${pdfFile.baseName}.decrypt.pdf`
    );
    const rawBuffer = fs.readFileSync(decryptPath);
    const parsePdfResult = await pdfParse(rawBuffer, {
        // pagerender: (pageData) => {
        //     return pageData;
        // },
    });

    console.log(parsePdfResult.info);

    let rawTextSnippets = parsePdfResult.text.split('\n');

    const headerIndex = rawTextSnippets.findIndex((value, _index, _list) => {
        return value.includes('/fuck/幣別/fuck/存款種類/fuck/帳號/fuck/外幣餘額/fuck/臺幣餘額/fuck/透支/質借額度');
    });

    rawTextSnippets = rawTextSnippets.slice(headerIndex);

    const tradeRecordPattern = RegExp('^/fuck/2\\d{3}/\\d{2}/\\d{2}/fuck/');

    const tradeRecords = rawTextSnippets
        .filter((e) => tradeRecordPattern.test(e))
        .map((e) => e.split('/fuck/').slice(1))
        .map((e) => e.map((x) => x.trim()))
        .map((e) => {
            const outcome = e[2].replace(',', '');
            const income = e[3].replace(',', '');

            const sign = outcome.length == 0 ? 1 : -1;
            const amount = Number(outcome.length > 0 ? outcome : income) * sign;

            return {
                'date': e[0],
                'tradeType': e[1],
                'amount': amount,
                'remain': Number(e[4].replace(',', '')),
                'comment': (e[5] || '') + (e[6] || ''),
            }
        });

    let preDate = '';
    let preOrderInDay = -1;

    const now = new Date();

    for (const tradeRecord of tradeRecords) {
        if (preDate == tradeRecord.date) {
            preOrderInDay++;
        } else {
            preDate = tradeRecord.date;
            preOrderInDay = 0;
        }

        await TradeRecord.create({
            date: Date.parse(tradeRecord.date),
            tradeType: tradeRecord.tradeType,
            orderInDay: preOrderInDay,
            amount: tradeRecord.amount,
            remain: tradeRecord.remain,
            comment: tradeRecord.comment,
            createdAt: now,
            updatedAt: now,
        });
    }

    // await TradeRecord.sync({  });

    return tradeRecords;

    // --------------------------------


    // for (const pageData of [pageDataList[0]]) {
    //     //
    //     /**
    //      * 參考: pdf-parse/ 搜尋keyword: getTextContent
    //      *
    //      * # MessageHandler
    //      *
    //      * 用法:
    //      * MessageHandler(...).sendWithStream('GetTextContent');
    //      *
    //      * streamTextContent
    //      *
    //      * var readableStream = this.streamTextContent(params);
    //      */
    //
    //     // console.log(pageData.transport.pdfDocument.pdfInfo);
    //     // console.log(pageData.objs.objs);
    //     // console.log(pageData.transport.messageHandler);
    //
    //     // pageData.transport.messageHandler.on('GetTextContent', (data: any, sink: any) => {
    //     //     console.log('~~~ GetTextContent');
    //     //     console.log(data);
    //     //     console.log(sink);
    //     // });
    //     //
    //     // (pageData.transport.messageHandler as any).sendWithStream('GetTextContent');
    // }
    //
    // await sleep(10000);
}




