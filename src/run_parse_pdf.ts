import {initEnv} from "@src/app/env";
import {decryptPdf, getAllInputPdfFiles, getRepositoryPath, parsePdf} from "@src/utils";
import path from "path";
import {initDatabase} from "@src/database";

export const runParsePdf = async () => {
    const env = initEnv();
    const pdfFiles = getAllInputPdfFiles();
    const pdfPassword = env.PDF_PASSWORD;
    console.log(`pdfPassword: '${pdfPassword}'`);
    await initDatabase();

    for (const pdfFile of pdfFiles) {
        if (pdfFile.fileName.endsWith('.decrypt.pdf')) {
            continue;
        }
        const decryptOptions = {
            fileName: pdfFile.fileName,
            password: pdfPassword,
        };
        decryptPdf(decryptOptions);
        const results = await parsePdf(pdfFile);
        // TODO: ...
        console.log(results);
    }
}