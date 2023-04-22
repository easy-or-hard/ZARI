import {Model, DataTypes} from 'sequelize';
import CustomSequelize from '../../utils/configure/CustomSequelize.js';
import Banzzack from "./Banzzack.js";
import Zari from "./Zari.js";

export default class Byeol extends Model {

    static initialize() {
        super.init(this.#attributes, this.#options);
    }

    static associate() {
        this.hasMany(Banzzack, {onDelete: 'cascade'});
        this.hasOne(Zari, {onDelete: 'cascade'});
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
                len: [2, 8]
            }
        };
        return attributes;
    }
}

Byeol.initialize();