import {Model, DataTypes} from 'sequelize';
import BanzzackModel from "./BanzzackModel.js";
import ZariModel from "./ZariModel.js";

export default class ByeolModel extends Model {
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
        this.hasOne(ZariModel, {onDelete: 'cascade'});
        this.hasMany(BanzzackModel, {onDelete: 'cascade'});
    }
}