import Byeol from "../models/Byeol.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import Zari from "../models/Zari.js";

export default class ByeolService {
    static #instance;
    #model;
    #logger;

    constructor({
                    _model = new Byeol(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#model = _model;
        this.#logger = _logger;
    }

    create = async (body) => {
        const result = await this.#model.create(body);
        return result;
    }

    read = async (body) => {
        const result = await this.#model.read(body);
        return result;
    }

    update = async (body) => {
        const result = await this.#model.update(body);
        return result;
    }

    delete = async (body) => {
        const result = await this.#model.delete(body);
        return result;
    }

    /**
     *
     * @param {string} byeol
     * @returns {Promise<*>}
     */
    findByByeol = async (byeol) => {
        const result = await this.#model.findByByeol({
            where: byeol,
            include: [{
                model: Zari
            }]
        });
        return result;
    }
}