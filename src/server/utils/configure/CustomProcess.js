import dotenv from "dotenv";

/**
 * Custom environment configuration class.
 * Loads environment variables and provides convenient access to them.
 */
class CustomEnv {
    static #instance;
    #nodeEnv;
    #port;
    #loggerLevel;
    #sequelizeOptions;
    #dbHost;
    #dbDialect;
    #dbPort;
    #dbUsername;
    #dbPassword;

    /**
     * CustomEnv constructor.
     * Loads environment variables from the .env file using dotenv and sets the internal nodeEnv variable.
     * @throws {Error} if NODE_ENV is not defined in the .env file.
     */
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        dotenv.config();

        this.#nodeEnv = process.env.NODE_ENV || 'test';
    }

    /**
     * @returns {number} The port number defined in the .env file or 3000 as the default value.
     * @throws {Error} if the PORT is not defined in the .env file.
     */
    get PORT() {
        if (this.#port) {
            return this.#port;
        }

        this.#port = this.#isTest() ? 3000 : process.env.PORT;
        if (!this.#port) {
            throw new Error('PORT is not defined in the .env file.');
        }

        return this.#port;
    }

    /**
     * @returns {string} The logger level defined in the .env file or 'debug' as the default value.
     * @throws {Error} if LOGGER_LEVEL is not defined in the .env file.
     */
    get LOGGER_LEVEL() {
        if (this.#loggerLevel) {
            return this.#loggerLevel;
        }

        this.#loggerLevel = process.env.LOGGER_LEVEL || this.#isTest() && 'debug';
        return this.#loggerLevel;
    }

    /**
     * @returns {{password: *, dialect: string, port: string, host: string, pool: {min: number, max: number, idle: number, acquire: number}, username: *}|{dialect: string, storage: string}}
     * @constructor
     */
    get SEQUELIZE_OPTIONS() {
        if (this.#sequelizeOptions) {
            return this.#sequelizeOptions;
        }

        if (this.#isTest()) {
            this.#sequelizeOptions = {
                dialect: 'sqlite',
                storage: ':memory:'
            }
        } else {
            this.#sequelizeOptions = {
                logging: false, // 쿼리 로그 출력 옵션, true는 쿼리 로그를 출력한다.
                host: this.DB_HOST,
                port: this.DB_PORT,
                dialect: this.DB_DIALECT,
                username: this.DB_USERNAME,
                password: this.DB_PASSWORD,
                pool: {
                    max: 5, // Maximum number of connections in the pool
                    min: 0, // Minimum number of connections in the pool
                    acquire: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released
                    idle: 10000 // The maximum time, in milliseconds, that pool will try to get the connection before throwing an error
                }
            };
        }

        Object.freeze(this.#sequelizeOptions); // Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
        return this.#sequelizeOptions;
    }

    /**
     * @returns {string}
     * @constructor
     */
    get DB_HOST() {
        if (this.#dbHost) {
            return this.#dbHost;
        }

        this.#dbHost = this.#isTest() ? ':memory:' : process.env.DB_HOST;
        if (!this.#dbHost) {
            throw new Error('DB_HOST is not defined, please check .env file');
        }

        return this.#dbHost;
    }
    ;

    /**
     *
     * @returns {string}
     * @constructor
     */
    get DB_DIALECT() {
        if (this.#dbDialect) {
            return this.#dbDialect;
        }

        this.#dbDialect = this.#isTest() ? 'sqlite' : process.env.DB_DIALECT;
        if (!this.#dbDialect) {
            throw new Error('DB_DIALECT is not defined, please check .env file');
        }

        return this.#dbDialect;
    }

    /**
     * @returns {string} The node environment defined in the .env file.
     * @throws {Error} if DB_PORT is not defined in the .env file.
     */
    get DB_PORT() {
        if (this.#dbPort) {
            return this.#dbPort;
        }
        this.#dbPort = process.env.DB_PORT;
        if (!this.#dbPort) {
            throw new Error('DB_PORT is not defined, please check .env file');
        }

        return this.#dbPort;
    }

    get DB_USERNAME() {
        if (this.#dbUsername) {
            return this.#dbUsername;
        }
        this.#dbUsername = process.env.DB_USERNAME;
        if (!this.#dbUsername) {
            throw new Error('DB_USERNAME is not defined, please check .env file');
        }

        return this.#dbUsername;
    }

    get DB_PASSWORD() {
        if (this.#dbPassword) {
            return this.#dbPassword;
        }

        this.#dbPassword = process.env.DB_PASSWORD;
        if (!this.#dbPassword) {
            throw new Error('DB_PASSWORD is not defined, please check .env file');
        }

        return this.#dbPassword;
    }

    get GITHUB_CALLBACK_URL() {
        if (process.env.GITHUB_CALLBACK_URL === undefined) {
            throw new Error('GITHUB_CALLBACK_URL is not defined, please check .env file');
        }
        return process.env.GITHUB_CALLBACK_URL;
    }

    get GITHUB_CLIENT_SECRET() {
        if (process.env.GITHUB_CLIENT_SECRET === undefined) {
            throw new Error('GITHUB_CLIENT_SECRET is not defined, please check .env file');
        }
        return process.env.GITHUB_CLIENT_SECRET;
    }

    get GITHUB_CLIENT_ID() {
        if (process.env.GITHUB_CLIENT_ID === undefined) {
            throw new Error('GITHUB_CLIENT_ID is not defined, please check .env file');
        }
        return process.env.GITHUB_CLIENT_ID;
    }

    get JWT_SECRET_KEY() {
        return process.env.JWT_SECRET_KEY || 'MyFasa, MyMasa, MyBurasa';
    }


    #isTest() {
        return this.#nodeEnv === 'test';
    }
}

/**
 * Singleton CustomProcess class.
 * Provides access to the CustomEnv instance.
 */
export default class CustomProcess {
    static #instance;

    /**
     * CustomProcess constructor.
     * Ensures that only one instance of CustomProcess is created.
     */
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.env = new CustomEnv();
    }
}

