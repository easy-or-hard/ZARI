import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const currentFileDir = path.dirname(fileURLToPath(import.meta.url));


/**
 * Custom environment configuration class.
 * Loads environment variables and provides convenient access to them.
 */
class CustomEnv {
    /**
     * CustomEnv constructor.
     * Loads environment variables from the .env file using dotenv and sets the internal nodeEnv variable.
     * @throws {Error} if NODE_ENV is not defined in the .env file.
     */
    constructor() {
        dotenv.config();
    }

    /**
     * @returns {string} The node environment defined in the .env file.
     * if NODE_ENV is not defined in the .env file, 'local' is returned.
     */
    get NODE_ENV() {
        return process.env.NODE_ENV || 'local';
    }

    get HOST() {
        let host = process.env.HOST;
        if (!host) {
            throw new Error('HOST is not defined, please check .env file');
        }
        return host;
    }

    /**
     * @returns {number} The port number defined in the .env file or 3000 as the default value.
     * @throws {Error} if the PORT is not defined in the .env file.
     */
    get PORT() {
        let port = process.env.PORT;
        if (!port) {
            throw new Error('PORT is not defined, please check .env file');
        }
        return port;
    }

    /**
     * @returns {string} The logger level defined in the .env file or 'debug' as the default value.
     * @throws {Error} if LOGGER_LEVEL is not defined in the .env file.
     */
    get LOGGER_LEVEL() {
        let level = process.env.LOGGER_LEVEL;
        if (!level) {
            throw new Error('LOGGER_LEVEL is not defined, please check .env file');
        }

        return level;
    }

    /**
     * @returns {string} The node environment defined in the .env file.
     * @throws {Error} if NODE_ENV is not defined in the .env file.
     */
    get DB_HOST() {
        let host = process.env.DB_HOST;
        if (!host) {
            throw new Error('DB_HOST is not defined, please check .env file');
        }

        return host;
    };

    /**
     * @returns {string} The node environment defined in the .env file.
     * @throws {Error} if DB_DIALECT is not defined in the .env file.
     */
    get DB_DIALECT() {
        let dialect = process.env.DB_DIALECT;
        if (!dialect) {
            throw new Error('DB_DIALECT is not defined, please check .env file');
        }

        return dialect;
    }

    /**
     * @returns {string} The node environment defined in the .env file.
     * @throws {Error} if DB_PORT is not defined in the .env file.
     */
    get DB_PORT() {
        let port = process.env.DB_PORT;
        if (!port) {
            throw new Error('DB_PORT is not defined, please check .env file');
        }

        return port;
    }

    get DB_USERNAME() {
        let username = process.env.DB_USERNAME;
        if (!username) {
            throw new Error('DB_USERNAME is not defined, please check .env file');
        }

        return username;
    }

    get DB_PASSWORD() {
        let password = process.env.DB_PASSWORD;
        if (!password) {
            throw new Error('DB_PASSWORD is not defined, please check .env file');
        }

        return password;
    }

    get DB_SSL_CA() {
        return fs.readFileSync(path.resolve(currentFileDir, '../../ca.crt')).toString();
    }

    get DB_SSL_KEY() {
        return fs.readFileSync(path.resolve(currentFileDir, '../../client1.key')).toString();
    }

    get DB_SSL_CERT() {
        return fs.readFileSync(path.resolve(currentFileDir, '../../client1.crt')).toString();
    }
}

/**
 * Singleton CustomProcess class.
 * Provides access to the CustomEnv instance.
 */
export default new class CustomProcess {
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

    isDev() {
        return this.env.NODE_ENV === 'development';
    }

    isProd() {
        return this.env.NODE_ENV === 'production';
    }

    isLocal() {
        return this.env.NODE_ENV === 'local';
    }
}

