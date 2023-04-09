import {Model, DataTypes} from 'sequelize';
import CustomSequelize from '../../utils/configure/CustomSequelize.js';
import CommentModel from "./comment-model.js";

export default class ZodiacModel extends Model {
    static associate() {
        this.hasMany(CommentModel, {
            foreignKey: 'zodiac_name',
            sourceKey: 'name',
            as: 'comments',
        });
        CommentModel.belongsTo(this, {
            foreignKey: 'zodiac_name',
            targetKey: 'name',
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
    },
    {
        sequelize: new CustomSequelize(),
        modelName: 'zodiacUniverse',
    }
);