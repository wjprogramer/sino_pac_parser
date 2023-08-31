import {runParsePdf} from "@src/run_parse_pdf";
import {runMainServer} from "@src/run_main_server";
import {runReport} from "@src/run_report";

const main = () => {
  const appType = process.argv[2];

  switch (appType) {
    case 'parse_pdf':
      void runParsePdf();
      break;
    case 'main_server':
      void runMainServer();
      break;
    case 'report':
      void runReport();
      break;
    default:
      throw new Error('Please specify app type');
  }
}

main();