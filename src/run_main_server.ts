import {initEnv} from "@src/app/env";
import {getRepositoryPath} from "@src/utils";

export const runMainServer = async () => {
    const env = initEnv();

    const x = getRepositoryPath();
    console.log(x);

}