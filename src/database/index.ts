import {DataTypes, Sequelize} from "sequelize";
import {getDatabaseFolderPath} from "@src/utils";
import path from "path";
import * as fs from "fs";
import {TradeRecord} from "@src/database/entities";

let sequelize!: Sequelize;

export const initDatabase = async () => {
    const dbFolderPath = getDatabaseFolderPath();
    fs.mkdirSync(dbFolderPath, { recursive: true });

    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(dbFolderPath, 'database.sqlite')
    });


    TradeRecord.init(TradeRecord.tableAttrs, { sequelize });

    await sequelize.authenticate();

    await sequelize.sync({  });

}
