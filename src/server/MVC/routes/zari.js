import ZariController from "../controllers/zari-controller.js";
import express from "express";

export default new class ZariRoute {
    static #instance;
    router= express.Router();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#routeInitialize();
    }

    /**
     * @swagger
     * /zari/{id}:
     *   get:
     *     summary: 자리 객체 조회
     *     description: 자리 소유자, 자리의 반짝을 포함합니다.
     *     parameters:
     *       - in: path
     *         id: 자리의 id
     *         required: true
     *         schema:
     *           type: string
     *         description: 자리의 id
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
     * /zari:
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
        this.router.route('/zari')
            .post(ZariController.create)
            .get(ZariController.findAllIncludeComment)
        // .put(this.zodiacUniverseModel.update)
        // .delete(this.zodiacUniverseController.remove);

        this.router.get('/zari/:id', ZariController.findByPk);
    }
}