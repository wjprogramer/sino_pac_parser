// import {DataEntry} from "pdfreader";

export type PdfFile = {
    fileName: string,
    completeAddress: string,
    parent: string,
    baseName: string,
}

export type PdfParseResult = {
    error?: any,
    // data?: DataEntry,
};