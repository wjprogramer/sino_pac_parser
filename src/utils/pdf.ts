import * as fs from "fs";
import {getInputFolderPath} from "@src/utils/fs";
import {PdfFile, PdfPageData} from "@src/types";
import path from "path";
import pdfParse from "pdf-parse";
import {execSync} from "child_process";

export const getAllInputPdfFiles = (): PdfFile[] => {
    const inputFolderPath = getInputFolderPath();
    const paths = fs.readdirSync(inputFolderPath);
    return paths
        .filter((e) => e.endsWith('.pdf'))
        .map((fileName) => {
            return {
                fileName: fileName,
                completeAddress: path.join(inputFolderPath, fileName),
                parent: inputFolderPath
            };
        });
}

export const decryptPdf = (options: {
    filename: string,
    password: string,
}) => {
    // TODO:
    // qpdf --decrypt --password=A123456789 "./input/永豐銀行2021年04月份-電子綜合對帳單.pdf" output/output_file.pdf
    execSync;
}

export const parsePdf = async (pdfFile: PdfFile, options?: {
    password?: string,
}) => {
    const pageDataList: PdfPageData[] = [];

    const rawBuffer = fs.readFileSync(pdfFile.completeAddress);
    const parsePdfResult = await pdfParse(rawBuffer, {
        pagerender: (pageData) => {
            pageDataList.push(pageData);
            return pageData;
        },
    });

    console.log(parsePdfResult.info);

    for (const pageData of [pageDataList[0]]) {
        //
        /**
         * 參考: pdf-parse/ 搜尋keyword: getTextContent
         *
         * # MessageHandler
         *
         * 用法:
         * MessageHandler(...).sendWithStream('GetTextContent');
         *
         * streamTextContent
         *
         * var readableStream = this.streamTextContent(params);
         */

        // console.log(pageData.transport.pdfDocument.pdfInfo);
        // console.log(pageData.objs.objs);
        console.log(pageData.transport.messageHandler);

        pageData.transport.messageHandler.on('Get');

    }

}




