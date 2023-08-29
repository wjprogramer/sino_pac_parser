// import {DataEntry} from "pdfreader";

export type PdfFile = {
    fileName: string,
    completeAddress: string,
    parent: string,
}

export type PdfParseResult = {
    error?: any,
    // data?: DataEntry,
};