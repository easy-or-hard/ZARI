import winston from 'winston';
import customProcess from "./custom-process.js";

export default new class CustomLogger {
    static #instance;
    #logger = winston.createLogger(this.constructor.#options);

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.constructor.#instance = this;
    }

    static get #options() {
        return {
            level: customProcess.env.LOGGER_LEVEL,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console()
            ]
        };
    };


    log(level, message) {
        this.#logger.log(level, message);
    }

    info(message) {
        this.#logger.info(message);
    }

    error(message) {
        this.#logger.error(message);
    }

    debug(message) {
        this.#logger.debug(message);
    }
}