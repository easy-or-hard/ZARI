import dotenv from "dotenv";
class CustomEnv {
    #env;
    constructor() {
        dotenv.config();
        this.#env = process.env.NODE_ENV || 'development';
    }

    get PORT() {
        return this.#env === 'development' ? 8080 : 80;
    }

    get LOGGER_LEVEL() {
        return this.#env === 'development' ? 'debug' : 'info';
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

