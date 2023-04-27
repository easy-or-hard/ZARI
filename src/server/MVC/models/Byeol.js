import {Model, DataTypes} from 'sequelize';
import Banzzack from "./Banzzack.js";
import Zari from "./Zari.js";

export default class Byeol extends Model {
    static initialize(sequelize) {
        super.init(
            {
                byeol: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                providerId: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    unique: 'authUnique',
                },
                provider: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'authUnique',
                },
            },
            { sequelize });
    }

    static associate() {
        this.hasOne(Zari, {onDelete: 'cascade'});
        this.hasMany(Banzzack, {onDelete: 'cascade'});
    }
}