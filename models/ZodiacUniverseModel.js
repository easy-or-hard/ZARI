import { Model, DataTypes } from 'sequelize';
import database from '../config/database.js';

const sequelize = database;

export default class ZodiacUniverseModel extends Model {}

ZodiacUniverseModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
    },
    {
        sequelize,
        modelName: 'zodiac_universe',
    }
);