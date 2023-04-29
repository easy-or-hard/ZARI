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
            // .post(this.create)   // 간편 로그인 콜백에서 자동 생성
        /**
         * @swagger
         * /api/byeol:
         *   get:
         *     summary: 사용자의 별 정보 검색
         *     description: 인증된 사용자의 별 정보를 반환합니다.
         *     tags:
         *       - Byeol
         *     security:
         *       - BearerAuth: []
         *     responses:
         *       200:
         *         description: 별 정보가 성공적으로 검색됨
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: integer
         *                   example: 1
         *                 byeol:
         *                   type: string
         *                   example: "naruto"
         *                 providerId:
         *                   type: string
         *                   example: "1"
         *                 provider:
         *                   type: string
         *                   example: "none"
         *                 createdAt:
         *                   type: string
         *                   format: date-time
         *                   example: "2023-04-28T08:28:22.086Z"
         *                 updatedAt:
         *                   type: string
         *                   format: date-time
         *                   example: "2023-04-28T08:28:22.086Z"
         *                 Zari:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: integer
         *                       example: 1
         *                     createdAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2023-04-28T08:28:22.133Z"
         *                     updatedAt:
         *                       type: string
         *                       format: date-time
         *                       example: "2023-04-28T08:28:22.133Z"
         *                     ByeolId:
         *                       type: integer
         *                       example: 1
         *                     ZodiacId:
         *                       type: integer
         *                       example: 8
         *                     Banzzacks:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           id:
         *                             type: integer
         *                             example: 1
         *                           banzzack:
         *                             type: string
         *                             example: "I wish you a happy start to the day. You are special."
         *                           createdAt:
         *                             type: string
         *                             format: date-time
         *                             example: "2023-04-28T08:28:22.460Z"
         *                           updatedAt:
         *                             type: string
         *                             format: date-time
         *                             example: "2023-04-28T08:28:22.460Z"
         *                           ByeolId:
         *                             type: integer
         *                             example: 4
         *                           ZariId:
         *                             type: integer
         *                             example: 1
         *       401:
         *         description: 인증되지 않은 접근
         *       500:
         *         description: 별 정보를 검색하는 동안 오류 발생
         */
            .get(this.read)
            /**
             * @swagger
             * /api/byeol:
             *   put:
             *     summary: 별의 이름을 변경합니다.
             *     description: 인증된 사용자의 별의 이름을 변경합니다.
             *     tags:
             *       - Byeol
             *     security:
             *       - BearerAuth: []
             *     requestBody:
             *       description: 변경할 별의 이름을 제공해야 합니다.
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               byeol:
             *                 type: string
             *                 example: "sasuke"
             *     responses:
             *       200:
             *         description: 별의 이름이 성공적으로 변경되었습니다.
             *       400:
             *         description: 잘못된 요청 (예: 필수 요소 누락)
             *       401:
             *         description: 인증되지 않은 접근
             *       500:
             *         description: 별의 이름을 변경하는 동안 오류 발생
             */
            .put(this.update)

        this.router.get('/api/byeol/:id', this.#byeolService.findByPk.bind(this));
        this.router.get('/api/byeol/is-sign-up-available/:byeol', this.isNameAvailable.bind(this));
    }

    /**
     * AuthController 에서 req.user 에 byeol 을 넣어준다.(의존성 있음)
     * 반드시 req.user 에 byeol 이 존재해야 한다.
     * 현재 가입은 간편 로그인만 있기 때문에 path 를 활성화 하지 않았습니다.
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    create = async (req, res, next) => {
        const {user} = req;
        await this.#byeolService.create(user);
        return res.status(200);
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    read = async (req, res, next) => {
        const user = req.user;
        const byeol = await this.#byeolService.read(user);
        return res.json(byeol);
    }

    /**
     * 별의 byeol(이름)을 바꿉니다.
     * @async
     * @param {Request} req - 사용자 객체
     * @param {Response} res - 요청 본문
     * @param {NextFunction} next - 다음 미들웨어 함수
     * @returns {Promise<*>}
     */
    update = async (req, res, next) => {
        const {user} = req;
        const {body} = req;
        try {
            await this.#byeolService.update(user, body);
        } catch (e) {
            return next(e);
        }
        return res.status(200);
    }

    isNameAvailable = async (req, res, next) => {
        const {byeol} = req.body;
        const condition = {
            where: {
                name: byeol.name
            }
        }
        const count = await this.#byeol.count(condition);
        return count === 0 ? res.sendStatus(200) : res.sendStatus(400);
    }
}