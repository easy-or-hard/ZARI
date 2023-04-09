import {Model, DataTypes} from 'sequelize';
import CustomSequelize from '../../utils/configure/CustomSequelize.js';
import CommentModel from "./comment-model.js";

export default class ZodiacModel extends Model {
    static associate() {
        this.belongsToMany(CommentModel, {
            through: 'foreign_zodiac_comment',
            foreignKey: 'zodiacName'
        });
    }
}

ZodiacModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: new CustomSequelize(),
        modelName: 'zodiac_universe',
    }
);