import Byeol from "../models/Byeol.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import Zari from "../models/Zari.js";

export default class ByeolService {
    static #instance;
    /**
     * @type {Byeol}
     */
    #model;
    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _model = Byeol,
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#model = _model;
        this.#logger = _logger;
    }

    /**
     *
     * @param byeol
     * @param providerId
     * @param provider
     * @returns {Promise<Byeol>}
     */
    create = async ({
                        byeol,
                        providerId,
                        provider
                    } = {}) => {
        this.#logger.info(`ByeolService.create: byeol: ${byeol}, providerId: ${providerId}, provider: ${provider}`);
        return await this.#model.create({byeol, providerId, provider});
    }

    /**
     *
     * @param id
     * @returns {Promise<Byeol>}
     */
    read = async id => {
        this.#logger.info(`ByeolService.read: id: ${id}`);
        return await this.#model.findByPk(id);
    }

    /**
     * @returns {Promise<Byeol[]>}
     */
    readAll = async (page = 1, pageSize = 10) => {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        this.#logger.info(`ByeolService.readAll: offset: ${offset}, limit: ${limit}`);
        return await this.#model.findAll({
            offset,
            limit,
        });
    }

    update = async () => {
        throw new Error('Not implemented');
        // return await this.#model.update(body);
    }

    delete = async () => {
        throw new Error('Not implemented');
    }

    /**
     *
     * @param {number} id
     * @returns {Promise<*>}
     */
    findByPk = async (id) => {
        this.#logger.info(`ByeolService.findByPk: id: ${id}`);
        return await this.#model.findByPk(id, {
            include: [{
                model: Zari
            }]
        });
    }

    updateByeol = async (byeolId, byeol) => {
        this.#logger.info(`ByeolService.updateByeol: byeolId: ${byeolId}, byeol: ${byeol}`);
        const byeolInstance = await Byeol.findByPk(byeolId);
        return await byeolInstance.update({byeol});
    }

    userExists = async (providerId, provider) => {
        this.#logger.info(`ByeolService.userExists: providerId: ${providerId}, provider: ${provider}`);
        const condition = {
            where: {
                providerId,
                provider
            }
        }
        const byeol = await this.#model.findOne(condition);
        return !!byeol;
    }
}