import ZariController from "../controllers/ZariController.js";
import express from "express";

export default class ZariRouter {
    static #instance;
    router= express.Router();
    #controller = new ZariController();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        // this.#routeInitialize();
    }

    #routeInitialize() {
        this.router.route('/zari')
            .post(this.#controller.create)
            .get(this.#controller.findAllIncludeComment)
        // .put(this.zodiacUniverseModel.update)
        // .delete(this.zodiacUniverseController.remove);

        this.router.get('/zari/:id', this.#controller.findByPk);
    }
}