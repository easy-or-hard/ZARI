import CustomLogger from "../../utils/configure/CustomLogger.js";

export default class ZariService {
    static #instance;

    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = _logger;
    }
}