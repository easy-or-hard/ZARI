import Zodiac from "../models/Zodiac.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";

export default class ZariService {
    static #instance;

    /**
     * @type {CustomLogger}
     */
    #logger;

    #zodiac;

    constructor({
                    _zodiac = Zodiac,
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#zodiac = _zodiac;
        this.#logger = _logger;
    }

    readAll = async () => {
        this.#logger.debug(`ZariService.readAll`);
        return await this.#zodiac.findAll();
    }
}