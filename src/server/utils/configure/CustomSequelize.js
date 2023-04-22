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
        };

        return options[customProcess.env.NODE_ENV];
    }

    static get #options() {
        return {
            // timestamps: true,
            freezeTableName: true, // 테이블 이름을 모델 이름과 동일하게 설정, false는 테이블이름을 복수형으로 설정
            autoIncrement: true, // 자동 컬럼 id 부여 옵션
            underscored: true, // underscored 옵션은 모델의 속성 중에서 데이터베이스에 저장될 컬럼명을 snake_case로 생성합니다.
            underscoredAll: true // underscoredAll 옵션은 모델의 모든 속성, 즉 데이터베이스에 저장되는 컬럼명과 함께 자동 생성되는 테이블명도 snake_case로 생성합니다.
        }
    }
}
