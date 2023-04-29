import helmet from "helmet";
import CustomLogger from "../configure/CustomLogger.js";

export default class CustomHelmet {
    static #instance;
    #logger;

    constructor({
                    _logger = new CustomLogger()
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = _logger;
    }

    get helmet() {
        const options = {
            contentSecurityPolicy: '*',
        }

        this.#logger.info('헬멧 설정', options);
        return helmet(options);
    }
}