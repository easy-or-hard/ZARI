import {Model, DataTypes} from 'sequelize';
import Byeol from "./Byeol.js";

export default class Banzzack extends Model {
    static initialize(sequelize) {
        super.init({
                message: {
                    type: DataTypes.STRING(512),
                    allowNull: false,
                },
                byeolId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {sequelize});
    }

    static associate() {
        this.belongsTo(Byeol, {foreignKey: 'byeolId'});
    }
}