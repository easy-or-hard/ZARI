import CustomLogger from "../../utils/configure/CustomLogger.js";
import Zari from "../models/Zari.js";
import ByeolService from "./ByeolService.js";
import Byeol from "../models/Byeol.js";
import Banzzack from "../models/Banzzack.js";

export default class ZariService {
    static #instance;

    /**
     * @type {CustomLogger}
     */
    #logger;

    /**
     * @type {Byeol}
     */
    #byeol;

    /**
     * @type {Zari}
     */
    #zari;

    /**
     * @type {ByeolService}
     */
    #byeolService;

    constructor({
                    _logger = new CustomLogger(),
                    _byeol = Byeol,
                    _zari = Zari,
                    _byeolService = new ByeolService(),

                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = _logger;
        this.#byeol = _byeol;
        this.#zari = _zari;
        this.#byeolService = _byeolService;
    }

    create = async (byeolId, zodiacId, byeol) => {
        this.#logger.info(`ZariService.create: byeolId: ${byeolId}, byeol: ${byeol}, zodiacId: ${zodiacId}`);

        if(byeol) {
            await this.#byeolService.updateByeol(byeolId, byeol);
        }

        return await Zari.create({ byeolId, zodiacId });
    }

    readById = async id => {
        this.#logger.info(`ZariService.read: id: ${id}`);
        return await this.#zari.findByPk(id, { include: { model: Banzzack } });
    }

    delete = async id => {
        this.#logger.info(`ZariService.delete: id: ${id}`);
        return await this.#zari.destroy({where: {id}});
    }
}