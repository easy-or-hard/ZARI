import Sequelize from 'sequelize';
import pg from "pg";

let local = {
    dialect: 'sqlite',
    storage: ':memory:'
}

const dev = {
    dialect: 'postgres',
    host: 'db.xiyo.dev',
    port: 5432,
}

export default new Sequelize.Sequelize(local);