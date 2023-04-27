import CustomLogger from "../../utils/configure/CustomLogger.js";
import express from "express";
import ByeolService from "../services/ByeolService.js";

export default class ByeolController {
    /**
     * @type {ByeolController}
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
    #service;

    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _router = express.Router(),
                    _service = new ByeolService(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.router = _router;
        this.#service = _service;
        this.#logger = _logger;

        this.#routeInitialize();
    }

    #routeInitialize() {
        this.router.route('/api/byeol')
            .post(this.create)
            .get(this.read)
            .put(this.update)
            .delete(this.delete);

        this.router.get('/api/byeol/:byeol', this.#service.findByByeol);
    }

    create = async (req, res, next) => {
        const {body} = req;
        const result = await this.#service.create(body);
        return res.status(200);
    }

    read = async (req, res, next) => {
        const {body} = req;
        const result = await this.#service.read(body);
        return res.status(200);
    }

    update = async (req, res, next) => {
        const {body} = req;
        const result = await this.#service.update(body);
        return res.status(200);
    }

    delete = async (req, res, next) => {
        const {body} = req;
        const result = await this.#service.delete(body);
        return res.status(200);
    }
}