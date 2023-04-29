import Byeol from "../models/Byeol.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import Banzzack from "../models/Banzzack.js";

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
     * @param name
     * @param providerId
     * @param provider
     * @param zodiacId
     * @returns {Promise<Byeol>}
     */
    create = async ({
                        name,
                        providerId,
                        provider,
                        zodiacId
                    } = {}) => {
        this.#logger.info(`ByeolService.create: byeol: ${name}, providerId: ${providerId}, provider: ${provider}, zodiacId: ${zodiacId}`);
        return await this.#model.create({name, providerId, provider, zodiacId});
    }

    /**
     *
     * @param id
     * @returns {Promise<Byeol>}
     */
    read = async ({id}) => {
        this.#logger.info(`ByeolService.read: id: ${id}`);
        const options = {
            include: [
                {
                    model: Zari,
                    include: [
                        {model: Banzzack}
                    ]
                },
            ]
        };
        return await this.#model.findByPk(id, options);
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

    /**
     * 별의 byeol(이름)을 바꿉니다.
     * @param {Int} id - 사용자 객체
     * @param {string} byeol - 요청 본문
     * @returns {Promise<*>}
     */
    update = async ({id}, {byeol}) => {
        this.#logger.info(`ByeolService.update: id: ${id}, byeol: ${byeol}`);
        const oldInstanceCount = await this.#model.count({where: {byeol}});
        if (oldInstanceCount > 0) {
            throw new Error('이미 존재하는 별입니다.');
        }

        const instance = await this.#model.findByPk(id);
        return await instance.update({byeol});
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