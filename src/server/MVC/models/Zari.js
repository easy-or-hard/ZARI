import {Model, DataTypes} from 'sequelize';
import Banzzack from "./Banzzack.js";
import Byeol from "./Byeol.js";
import Zodiac from "./Zodiac.js";

export default class Zari extends Model {
    static initialize(sequelize) {
        super.init({},
            {sequelize});
    }

    static associate() {
        this.belongsTo(Byeol);
        this.belongsTo(Zodiac);
        this.hasMany(Banzzack, {onDelete: 'cascade'});
    }
}