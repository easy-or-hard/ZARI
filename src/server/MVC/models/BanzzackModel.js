import {Model, DataTypes} from 'sequelize';
import ByeolModel from "./ByeolModel.js";
import ZariModel from "./ZariModel.js";

export default class BanzzackModel extends Model {
    static initialize(sequelize) {
        super.init({
                banzzack: {
                    type: DataTypes.STRING(512),
                    allowNull: false,
                },
                byeolId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: ByeolModel,
                        key: 'id'
                    }
                },
                zariId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: ZariModel,
                        key: 'id'
                    }
                }
            },
            {sequelize});
    }

    static associate() {
        this.belongsTo(ByeolModel, {foreignKey: 'byeolId'});
        this.belongsTo(ZariModel, {foreignKey: 'zariId'});
    }
}