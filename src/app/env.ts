import * as dotenv from 'dotenv';

export type Env = {
    PDF_PASSWORD: string,
}

export const initEnv = (): Env => {
    dotenv.config();

    return {
        PDF_PASSWORD: process.env.PDF_PASSWORD!,
    };
}