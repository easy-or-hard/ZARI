import ZodiacUniverseController from "../controllers/ZodiacUniverseController.js";
import ParentRoutes from "./ParentRoutes.js";

export default class ZodiacUniverseRouter extends ParentRoutes {
    constructor() {
        super();
        this.zodiacUniverseController = new ZodiacUniverseController();
        this.#routeInitialize();
    }
    #routeInitialize = () => {
        this.router.route('/zodiac-universes')
            .post(this.zodiacUniverseController.create)
            .get(this.zodiacUniverseController.readAll)
            // .put(this.zodiacUniverseModel.update)
            // .delete(this.zodiacUniverseController.remove);

        this.router.get('/zodiac-universes/:name', this.zodiacUniverseController.readById);
    }
}