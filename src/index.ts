import {initEnv} from "@src/env";
import {getAllInputPdfFiles, getRepositoryPath, parsePdf} from "@src/utils";

const main = async () => {
  const env = initEnv();
  const pdfFiles = getAllInputPdfFiles();

  const options = {
    password: env.PDF_PASSWORD
  };

  for (const pdfFile of pdfFiles) {
    if (pdfFile.fileName != 'output_file.pdf') {
      continue;
    }
    // TODO: 解密
    await parsePdf(pdfFile, options);
  }
}

void main();