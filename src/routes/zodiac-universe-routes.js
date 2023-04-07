import ParentRoutes from "./parent-routes.js";
import ZodiacUniverseController from "../controllers/zodiac-universe-controller.js";


export default new class ZodiacUniverseRoute extends ParentRoutes {
    constructor() {
        super();
        this.#routeInitialize();
    }

    /**
     * @swagger
     * /zodiac-universes/{name}:
     *   get:
     *     summary: 조디악 유니버스 객체를 조회한다.
     *     description: 안녕하세요
     *     parameters:
     *       - in: path
     *         name: name
     *         required: true
     *         schema:
     *           type: string
     *         description: 조디악 유니버스 이름
     *     responses:
     *       200:
     *         description: A zodiac universe
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 description:
     *                   type: string
     * /zodiac-universes:
     *   post:
     *     summary: 새로운 조디악 유니버스 객체를 생성한다.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: 조디악 유니버스 객체 생성 성공
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 description:
     *                   type: string
     *       409:
     *         description: 조디악 유니버스 객체가 이미 존재함
     *   get:
     *     summary: 모든 조디악 유니버스 객체를 조회한다.
     *     responses:
     *       200:
     *         description: 조디악 유니버스 객체 목록
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                   description:
     *                     type: string
     */
    #routeInitialize() {
        this.router.route('/zodiac-universes')
            .post(ZodiacUniverseController.create)
            .get(ZodiacUniverseController.findAll)
        // .put(this.zodiacUniverseModel.update)
        // .delete(this.zodiacUniverseController.remove);

        this.router.get('/zodiac-universes/:name', ZodiacUniverseController.findByPk);
    }
}