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
                    unique: true,
                    validate: {
                        len: [2, 8]
                    }
                }
            },
            { sequelize });
    }

    static associate() {
        this.hasOne(ZariModel, {onDelete: 'cascade'});
        this.hasMany(BanzzackModel, {onDelete: 'cascade'});
    }
}