import {Model, DataTypes} from 'sequelize';
import CustomSequelize from '../../utils/configure/CustomSequelize.js';
import ZodiacModel from "./zodiac-model.js";

export default class CommentModel extends Model {
    static associate() {
        this.belongsToMany(ZodiacModel, {
            through: 'foreign_zodiac_comment',
            foreignKey: 'commentId',
        });
    }
}

CommentModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: new CustomSequelize(),
        modelName: 'comment',
    }
);
