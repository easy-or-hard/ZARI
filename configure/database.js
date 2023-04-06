import Sequelize from 'sequelize';
import pg from "pg";

let local = {
    dialect: 'sqlite',
    storage: ':memory:',
}
export default new Sequelize.Sequelize(local);