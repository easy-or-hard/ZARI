import Zodiac from "../models/Zodiac.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";

export default class ZariService {
    static #instance;

    /**
     * @type {CustomLogger}
     */
    #logger;

    /**
     * @type {Zodiac}
     */
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

    /**
     * 모든 황도궁 데이터를 검색합니다.
     * @async
     * @returns {Promise<Array<Zodiac>>} 모든 황도궁 데이터를 반환합니다.
     */
    readAll = async () => {
        this.#logger.info(`ZariService.readAll`);
        return await this.#zodiac.findAll();
    }

    /**
     * 주어진 ID에 해당하는 황도궁 데이터를 검색합니다.
     * @async
     * @param {number} id - 검색할 황도궁의 ID
     * @returns {Promise<Zodiac|null>} ID에 해당하는 황도궁 데이터를 반환하거나, 데이터가 없을 경우 null을 반환합니다.
     */
    readOne = async (id) => {
        this.#logger.info(`ZariService.readOne`);
        return await this.#zodiac.findByPk(id);
    }

    /**
     * 황도궁 ID를 검증합니다.
     * @param zodiacId
     * @returns {Promise<boolean>}
     */

    validateZodiacId = async (zodiacId) => {
        this.#logger.info(`ZariService.validateZodiacId - zodiacId: ${zodiacId}`);
        const instance = await this.readOne(zodiacId);
        if (!instance) {
            new Error(`Zodiac ID ${zodiacId} is not exist`);
        }
    }
}