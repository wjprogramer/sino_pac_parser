import * as fs from "fs";
import {getInputFolderPath} from "@src/utils/fs";
import {PdfFile} from "@src/types";
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
    const pageDataList: any[] = [];

    const rawBuffer = fs.readFileSync(pdfFile.completeAddress);
    await pdfParse(rawBuffer, {
        pagerender: (pageData) => {
            pageDataList.push(pageData);
            return pageData;
        },
    });

    for (const pageData of pageDataList) {
        console.log();
        console.log(pageData);
        console.log();
    }

}




