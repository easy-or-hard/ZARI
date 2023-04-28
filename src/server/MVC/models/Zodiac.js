import {DataTypes, Model} from "sequelize";
import Zari from "./Zari.js";

export default class Zodiac extends Model {
    static initialize(sequelize) {
        super.init(
            {
                zodiac: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                startMonth: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                startDay: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                endMonth: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                endDay: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
            },
            { sequelize });
    }

    static associate() {
        this.hasMany(Zari);
    }
}