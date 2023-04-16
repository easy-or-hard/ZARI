import winston from 'winston';
import customProcess from "../configure/custom-process.js";

export default new class CustomLogger {
    static #instance;
    static #logger = winston.createLogger({
        level: customProcess.env.LOGGER_LEVEL,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console()
        ],
    });

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    logExecution(method) {
        return async (...args) => {
            try {
                const result = await method.apply(this, args);
                this.constructor.#logger.info(`Method: ${method.name}, Result: ${JSON.stringify(result)}`);
                return result;
            } catch (error) {
                this.constructor.#logger.error(`Method: ${method.name}, Error: ${error.message}`);
                throw error;
            }
        }
    }

    // winston의 메서드를 프록시로 추가
    info(...args) {
        this.constructor.#logger.info(...args);
    }

    error(...args) {
        this.constructor.#logger.error(...args);
    }

    warn(...args) {
        this.constructor.#logger.warn(...args);
    }

    debug(...args) {
        this.constructor.#logger.debug(...args);
    }
}