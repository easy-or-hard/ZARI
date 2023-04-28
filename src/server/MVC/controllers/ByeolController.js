import CustomLogger from "../../utils/configure/CustomLogger.js";
import express from "express";
import ByeolService from "../services/ByeolService.js";
import Byeol from "../models/Byeol.js";

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
     * @type {Byeol}
     */
    #byeol;

    /**
     * @type {ByeolService}
     */
    #byeolService;

    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _router = express.Router(),
                    _byeol = Byeol,
                    _byeolService = new ByeolService(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.router = _router;
        this.#byeolService = _byeolService;
        this.#logger = _logger;
        this.#byeol = _byeol;

        this.#routeInitialize();
    }

    #routeInitialize() {
        this.router.route('/api/byeol')
            .post(this.create)
            .get(this.read)
            .put(this.update)
            .delete(this.delete);

        this.router.get('/api/byeol/:id', this.#byeolService.findByPk.bind(this));
        this.router.get('/api/byeol/is-sign-up-available/:byeol', this.isSignUpAvailable.bind(this));
    }

    /**
     * AuthController 에서 req.user 에 byeol 을 넣어준다.(의존성 있음)
     * 반드시 req.user 에 byeol 이 존재해야 한다.
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    create = async (req, res, next) => {
        const byeol = req.user;
        await this.#byeolService.create(byeol);
        return res.status(200);
    }

    read = async (req, res, next) => {
        const user = req.user;
        return res.status(200).json(user);
    }

    update = async (req, res, next) => {
        const {body} = req;
        const result = await this.#byeolService.update(body);
        return res.status(200);
    }

    delete = async (req, res, next) => {
        const {body} = req;
        const result = await this.#byeolService.delete(body);
        return res.status(200);
    }

    isSignUpAvailable = async (req, res, next) => {
        const {body} = req;
        const condition = {
            where: {
                byeol: body.byeol
            }
        }
        const count = await this.#byeol.count(condition);
        return count === 0 ? res.sendStatus(200) : res.sendStatus(400);
    }
}