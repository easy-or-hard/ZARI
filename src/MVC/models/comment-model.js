import { Model, DataTypes } from 'sequelize';
import CustomSequelize from '../../utils/configure/CustomSequelize.js';

export default class CommentModel extends Model {}

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
        zodiac_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: new CustomSequelize(),
        modelName: 'comment',
    }
);