import {Model, DataTypes} from 'sequelize';
import BanzzackModel from "./BanzzackModel.js";
import ByeolModel from "./ByeolModel.js";

export default class ZariModel extends Model {
    static initialize(sequelize) {
        super.init({
                zari: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        len: [1, 16]
                    }
                },
                byeolId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: ByeolModel,
                        key: 'id'
                    }
                }
            },
            {sequelize});
    }

    static associate() {
        this.belongsTo(ByeolModel, {foreignKey: 'byeolId'});
        this.hasMany(BanzzackModel, {onDelete: 'cascade'});
    }
}