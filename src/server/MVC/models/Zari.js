import { Model, DataTypes } from 'sequelize';
import CustomSequelize from '../../utils/configure/CustomSequelize.js';
import Banzzack from "./Banzzack.js";
import Byeol from "./Byeol.js";

export default class Zari extends Model {

    static initialize() {
        super.init(this.#attributes, this.#options);
    }

    static associate() {
        this.belongsTo(Byeol);
        this.hasMany(Banzzack, { onDelete: 'cascade' });
    }

    static get #options() {
        return {
            sequelize: new CustomSequelize(),
            modelName: this.name.toLowerCase(),
        }
    }

    static get #attributes() {
        let attributes = {};
        attributes[this.name.toLowerCase()] = {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [2, 16]
            }
        }
        return attributes;
    }
}

Zari.initialize();