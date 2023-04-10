import Sequelize from 'sequelize';
import customProcess from "./custom-process.js";

export default class CustomSequelize extends Sequelize {
    static #instance;

    constructor() {
        if (CustomSequelize.#instance) {
            return CustomSequelize.#instance;
        }

        super(CustomSequelize.#dbInfo);
        this.constructor.#instance = this;

        this.options.define = CustomSequelize.#options;
    }

    static get #dbInfo() {
        const options = {
            local: {
                dialect: 'sqlite',
                storage: ':memory:'
            },
            dev: {
                dialect: customProcess.env.DB_DIALECT,
                username: customProcess.env.DB_USERNAME,
                password: customProcess.env.DB_PASSWORD,
                host: customProcess.env.DB_HOST,
                port: customProcess.env.DB_PORT,
                pool: {
                    max: 5, // Maximum number of connections in the pool
                    min: 0, // Minimum number of connections in the pool
                    acquire: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released
                    idle: 10000 // The maximum time, in milliseconds, that pool will try to get the connection before throwing an error
                }
            },
            prod: {

            }
        };

        return options[customProcess.env.NODE_ENV];
    }

    static get #options() {
        return {
            // timestamps: true,
            freezeTableName: true,
            underscored: true,
            underscoredAll: true
        }
    }
}
