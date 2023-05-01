import CustomLogger from "../../lib/configure/CustomLogger.js";
import Banzzack from "../models/Banzzack.js";

export default class BanzzackService {
    static #instance;
    /**
     * @type {Byeol}
     */
    #bannzackModel;
    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _model = Banzzack,
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#bannzackModel = _model;
        this.#logger = _logger;
    }

    /**
     *
     * @param {Byeol} byeol
     * @param {Banzzack} banzzack
     * @returns {Promise<Banzzack>}
     */
    create = async (byeol, banzzack) => {
        return await this.#bannzackModel.create({byeolId: byeol.id, message: banzzack.message});
    }

    read = async () => {
        // no need to implement
    }

    /**
     *
     * @param {Byeol} byeol
     * @param {Banzzack} banzzack
     * @returns {Promise<Banzzack>}
     */
    update = async (byeol, banzzack) => {
        const banzzackInstance = await this.#bannzackModel.findByPk(banzzack.id);
        if (byeol.id !== banzzackInstance.byeolId) {
            throw new Error('별과 반짝이의 관계가 일치하지 않습니다.');
        }

        banzzackInstance.message = banzzack.message;
        return await banzzackInstance.save();
    }

    delete = async () => {

    }
}