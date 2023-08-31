import {TradeRecord} from "@src/database/entities";
import {initEnv} from "@src/app/env";
import {initDatabase} from "@src/database";

export const runReport = async () => {
    const env = initEnv();
    await initDatabase();

    const records = await TradeRecord.findAll();

    const x: { [key: string]: number } = {
        '折讓款': 0,
        '現金': 0,
        '利息存入': 0,
        '手機轉帳': 0,
        'ACH股息': 0,
        '申購預扣': 0,
        '申購退還': 0,
        '轉帳': 0,
        '預扣股款': 0,
        '直接加總:': 0,
        '股票款': 0,
        '跨行轉帳': 0,
    };

    for (const record of records) {
        x[record.tradeType] += record.amount;
    }

    console.log(x);

}