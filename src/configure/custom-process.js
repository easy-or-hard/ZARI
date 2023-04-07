import dotenv from "dotenv";
class CustomEnv {
    #nodeEnv;

    constructor() {
        dotenv.config();

        this.#nodeEnv = process.env.NODE_ENV;
        if (!this.#nodeEnv) {
            throw new Error('NODE_ENV is not defined, please check .env file');
        }
    }

    get PORT() {
        let port = process.env.PORT;
        if (!port) {
            throw new Error('PORT is not defined, please check .env file');
        }
        return port;
    }

    get LOGGER_LEVEL() {
        let level = process.env.LOGGER_LEVEL;
        if (!level) {
            throw new Error('LOGGER_LEVEL is not defined, please check .env file');
        }

        return level;
    }

}

export default new class CustomProcess {
    static #instance;
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.env = new CustomEnv();
    }
}

