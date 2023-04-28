import ZariService from "../services/ZariService.js";
import ByeolService from "../services/ByeolService.js";
import ZodiacService from "../services/ZodiacService.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import CustomJwt from "../../utils/security/auth/CustomJwt.js";
import {Router} from "express";

export default class ZariController {
    /**
     * @type {ZariController}
     * @protected
     */
    static #instance;

    /**
     * @type {*|Router}
     */
    router;

    /**
     * @type {ByeolService}
     */
    #byeolService;

    /**
     * @type {ZariService}
     */
    #zariService;

    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _router = Router(),
                    _byeolService = new ByeolService(),
                    _zariService = new ZariService(),
                    _zodiacService = new ZodiacService(),
                    _jwt = new CustomJwt(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.router = _router;
        this.#zariService = _zariService;
        this.#byeolService = _byeolService;
        this.#logger = _logger;

        this.constructor.#instance = this;
    }

    routeInitialize = () => {
        this.router.get('/zari', this.readAll);
    }

    readAll = async (req, res) => {
        this.#logger.info(`ZariController.readAll`);
        const instances = await this.#zariService.readAll();
        res.json(instances);
    }
}