import ParentRoutes from "./ParentRoutes.js";
import ZodiacUniverseController from "../controllers/ZodiacUniverseController.js";

export default new class ZodiacUniverseRoute extends ParentRoutes {
    /**
     *
     * @type {ZodiacUniverseController}
     */
    #controller= new ZodiacUniverseController();
    constructor() {
        super();
        this.#routeInitialize();
    }

    #routeInitialize() {
        this.router.all('/zodiac-universes', this.#controller.findAll);
        this.router.route('/zodiac-universes')
            .post(this.#controller.create)
            .get(this.#controller.findAll)
        // .put(this.zodiacUniverseModel.update)
        // .delete(this.zodiacUniverseController.remove);

        this.router.get('/zodiac-universes/:name', this.#controller.findByPk);
    }
}