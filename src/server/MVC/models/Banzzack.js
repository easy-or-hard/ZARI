import {Model, DataTypes} from 'sequelize';
import Byeol from "./Byeol.js";
import Zari from "./Zari.js";

export default class Banzzack extends Model {
    static initialize(sequelize) {
        super.init({
                banzzack: {
                    type: DataTypes.STRING(512),
                    allowNull: false,
                }
            },
            {sequelize});
    }

    static associate() {
        this.belongsTo(Byeol);
        this.belongsTo(Zari);
    }
}