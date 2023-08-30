import {DataTypes, Model} from "sequelize";

export class TradeRecord extends Model {
    declare id: number;
    declare date: Date;
    declare tradeType: string;
    declare orderInDay: string;
    declare remain: number;
    declare comment: string;
    declare createdAt: Date;

    static tableAttrs = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        tradeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderInDay: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        remain: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }

    declare updatedAt: Date;
}


