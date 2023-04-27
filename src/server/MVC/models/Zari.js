import {Model, DataTypes} from 'sequelize';
import Banzzack from "./Banzzack.js";
import Byeol from "./Byeol.js";

export default class Zari extends Model {
    static initialize(sequelize) {
        super.init({
                zari: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        len: [1, 16]
                    }
                }
            },
            {sequelize});
    }

    static associate() {
        this.belongsTo(Byeol);
        this.hasMany(Banzzack, {onDelete: 'cascade'});
    }
}