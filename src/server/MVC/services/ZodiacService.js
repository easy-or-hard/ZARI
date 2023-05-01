import Zodiac from "../models/Zodiac.js";
import CustomLogger from "../../lib/configure/CustomLogger.js";
import {EmptyIdError, NotExistsIdError} from "../../lib/errors/CustomError.js";

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
     * 입력된 ID 값이 존재하는지 검사합니다.
     * @param id
     * @returns {Promise<void>}
     */
    validateEmptyId = async (id) => {
        this.#logger.info(`ZariService.validateEmptyId - id: ${id}`);

        if (!id) {
            throw new EmptyIdError();
        }
    }

    /**
     * 입력된 ID 값이 데이터 베이스에 있는지 검사합니다.
     * @param id
     * @returns {Promise<void>}
     */
    validateNotExistsId = async (id) => {
        this.#logger.info(`ZariService.validateNotExistsId - id: ${id}`);

        if (!id) {
            throw new NotExistsIdError();
        }
    }
}