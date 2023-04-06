import { Sequelize, Model, DataTypes } from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: 'localhost',
    port: 5432,
    database: 'zodiac_universe',
    username: 'xiyo',
    password: 'A.T.Field7!',
});

export default class TestModel extends Model {}

TestModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'zodiac_universe',
    }
);
