import winston from 'winston';
import CustomProcess from "./CustomProcess.js";

export default class CustomLogger {
    static #instance;
    #customProcess = new CustomProcess();
    #logger = winston.createLogger(this.#options);

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.constructor.#instance = this;
    }

    get #options() {
        return {
            level: this.#customProcess.env.LOGGER_LEVEL,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console()
            ]
        };
    };


    log(...args) {
        this.#logger.log(...args);
    }

    info(...args) {
        this.#logger.info(...args);
    }

    error(...args) {
        this.#logger.error(...args);
    }

    debug(...args) {
        this.#logger.debug(...args);
    }
}