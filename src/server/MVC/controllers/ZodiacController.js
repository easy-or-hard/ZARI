import {Router} from "express";
import ZodiacService from "../services/ZodiacService.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Zodiac:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 황도궁 ID
 *         zodiac:
 *           type: string
 *           description: 황도궁 이름
 *         startMonth:
 *           type: integer
 *           description: 황도궁 시작 월
 *         startDay:
 *           type: integer
 *           description: 황도궁 시작 일
 *         endMonth:
 *           type: integer
 *           description: 황도궁 종료 월
 *         endDay:
 *           type: integer
 *           description: 황도궁 종료 일
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 레코드 생성 일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 레코드 수정 일시
 */
export default class ZodiacController {
    /**
     * @type {ZodiacController}
     * @protected
     */
    static #instance;

    /**
     * @type {Router}
     */
    router;

    /**
     * @type {CustomLogger}
     */
    #logger;

    /**
     * @type {ZodiacService}
     */
    #zodiacService;

    constructor({
                    _router = Router(),
                    _logger = new CustomLogger(),
                    _zodiacService = new ZodiacService(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.router = _router;
        this.#logger = _logger;
        this.#zodiacService = _zodiacService;

        this.#routeInitialize();
    }

    #routeInitialize = () => {
        /**
         * @swagger
         * /api/zodiac:
         *   get:
         *     summary: 황도궁 목록 검색
         *     description: 시작 및 종료 날짜를 포함한 모든 황도궁 목록을 가져옵니다.
         *     tags:
         *       - Zodiac
         *     responses:
         *       200:
         *         description: 황도궁 목록
         *         content:
         *           application/json:
         *             schema:
         *               oneOf:
         *                 - type: array
         *                   items:
         *                     $ref: '#/components/schemas/Zodiac'
         *                 - $ref: '#/components/schemas/Zodiac'
         */
        this.router.get('/api/zodiac', this.readAll);

        /**
         * @swagger
         * /api/zodiac/{id}:
         *   get:
         *     summary: ID별 단일 황도궁 검색
         *     description: 시작 및 종료 날짜를 포함한 ID별 단일 황도궁을 가져옵니다.
         *     tags:
         *       - Zodiac
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: 황도궁 ID
         *     responses:
         *       200:
         *         description: 단일 황도궁
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Zodiac'
         */
        this.router.get('/api/zodiac/:id', this.readOne)
    }

    /**
     * @async
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<Zodiac[]>}
     */
    readAll = async (req, res) => {
        this.#logger.info(`ZariController.readAll`);
        const instances = await this.#zodiacService.readAll();
        return res.json(instances);
    }

    /**
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<Zodiac|null|*>}
     */
    readOne = async (req, res, next) => {
        try {
            this.#logger.info(`ZariController.readOne`);
            const instance = await this.#zodiacService.readOne(req.params.id);
            if (!instance) return res.status(404).json({message: 'Not Found Data'});
            return res.json(instance);
        } catch (e) {
            this.#logger.error(e);
            return next(new Error('Internal Server Error'));
        }
    }
}