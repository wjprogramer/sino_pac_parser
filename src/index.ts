import {runParsePdf} from "@src/run_parse_pdf";
import {runMainServer} from "@src/run_main_server";

const main = () => {
  const appType = process.argv[2];

  switch (appType) {
    case 'parse_pdf':
      void runParsePdf();
      break;
    case 'main_server':
      void runMainServer();
      break;
    default:
      throw new Error('Please specify app type');
  }
}

main();