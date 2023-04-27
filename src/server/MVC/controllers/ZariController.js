import ZariService from "../services/ZariService.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";

export default class ZariController {
    /**
     * @type {ZariController}
     * @protected
     */
    static #instance;

    /**
     * @type {ZariService}
     */
    #service;

    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _service = new ZariService(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.#service = _service;
        this.#logger = _logger;

        this.constructor.#instance = this;
    }
}