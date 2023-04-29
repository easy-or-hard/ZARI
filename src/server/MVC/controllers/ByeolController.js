import CustomLogger from "../../utils/configure/CustomLogger.js";
import express from "express";
import ByeolService from "../services/ByeolService.js";
import Byeol from "../models/Byeol.js";
import {NameAlreadyExistsError} from "../../utils/errors/CustomError.js";
import CustomProcess from "../../utils/configure/CustomProcess.js";

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

    /**
     * @type {CustomProcess}
     */
    #process;

    constructor({
                    _router = express.Router(),
                    _byeol = Byeol,
                    _byeolService = new ByeolService(),
                    _logger = new CustomLogger(),
                    _process = new CustomProcess(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.router = _router;
        this.#byeol = _byeol;
        this.#byeolService = _byeolService;
        this.#logger = _logger;
        this.#process = _process;


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
             *       description: 별의 새로운 이름을 제공합니다.
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 example: "새로운_이름"
             *     responses:
             *       200:
             *         description: 별의 이름이 성공적으로 변경되었습니다.
             *       400:
             *         description: 잘못된 요청, 필수 값 누락 또는 이름이 이미 존재함
             *         content:
             *           application/json:
             *             schema:
             *               type: object
             *               properties:
             *                 error:
             *                   type: string
             *                   example: "NameAlreadyExistsError"
             *                 message:
             *                   type: string
             *                   example: "이 별 이름은 이미 존재합니다."
             *       401:
             *         description: 인증되지 않은 접근
             *       500:
             *         description: 별의 이름을 변경하는 동안 오류가 발생했습니다.
             */
            .put(this.update);

        /**
         * @swagger
         * /api/byeol/is-can-use-name/{name}:
         *   get:
         *     summary: 별의 이름을 사용할 수 있는지 확인합니다.
         *     description: 제공된 이름이 별의 이름으로 사용할 수 있는지 확인합니다.
         *     tags:
         *       - Byeol
         *     parameters:
         *       - name: name
         *         in: path
         *         description: 사용 가능 여부를 확인할 이름입니다.
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: 사용 가능한 이름입니다.
         *       400:
         *         description: 사용 불가능한 이름입니다.
         */
        this.router.get('/api/byeol/is-can-use-name/:name', this.isCanUseName);
        /**
         * @swagger
         * /api/byeol/zodiac:
         *   put:
         *     summary: 별의 별자리를 선택합니다. 되돌릴 수 없습니다.
         *     description: 인증된 사용자의 별의 별자리를 선택합니다.
         *     tags:
         *       - Byeol
         *     security:
         *       - BearerAuth: []
         *     requestBody:
         *       description: 변경할 별자리의 ID를 제공하세요.
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               zodiacId:
         *                 type: number
         *                 example: 1
         *     responses:
         *       200:
         *         description: 별의 별자리가 성공적으로 변경되었습니다.
         *       400:
         *         description: 잘못된 요청, 필수 값 누락 또는 이미 설정된 별자리
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 error:
         *                   type: string
         *                   example: "CanNotChangeZodiacError"
         *                 message:
         *                   type: string
         *                   example: "별자리를 변경할 수 없습니다."
         *       401:
         *         description: 인증되지 않은 접근
         *       500:
         *         description: 별의 별자리를 업데이트하는 동안 오류가 발생했습니다.
         */

        this.router.put('/api/byeol/zodiac', this.setZodiac);

        /**
         * @swagger
         * /api/byeol:
         *   delete:
         *     summary: 별을 삭제합니다.
         *     description: 인증된 사용자의 별을 삭제하고, 별에 기록된 반짝임도 삭제합니다.
         *     tags:
         *       - Byeol
         *     security:
         *       - BearerAuth: []
         *     responses:
         *       200:
         *         description: 별이 삭제되었습니다. 별에 기록된 반짝임도 삭제되었습니다.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "별이 삭제되었습니다. 별에 기록된 반짝임도 삭제되었습니다."
         *       401:
         *         description: 인증되지 않은 접근
         *       500:
         *         description: 별을 삭제하는 동안 오류가 발생했습니다.
         */
        this.router.delete('/api/byeol', this.delete);
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
        const {byeol} = req.body;
        await this.#byeolService.create(byeol);
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
        try {
            const {user} = req;
            const {name} = req.body;

            await this.#byeolService.updateName(user, name);
            return res.status(200).send("별의 이름이 변경되었습니다.");
        } catch (e) {
            return next(e);
        }
    }

    isCanUseName = async (req, res, next) => {
        try {
            const {name} = req.params;
            const isCanUseName = await this.#byeolService.isCanUseName(name);
            return isCanUseName
                ? res.status(200).send("사용 가능한 이름입니다.")
                : next(new NameAlreadyExistsError());
        } catch (e) {
            return next(e);
        }
    }

    setZodiac = async (req, res, next) => {
        try {
            const {user} = req;
            const {zodiacId} = req.body;
            await this.#byeolService.setZodiac(user, zodiacId);
            return res.status(200).send("별의 별자리가 변경되었습니다.");
        } catch (e) {
            return next(e);
        }
    }

    delete = async (req, res, next) => {
        try {
            const {user} = req;
            await this.#byeolService.delete(user);
            res.clearCookie(this.#process.env.JWT_TOKEN_NAME);
            return res.status(200).send("별이 삭제되었습니다. 별에 기록되었던 반짝도 삭제 되었습니다.");
        } catch (e) {
            return next(e);
        }
    }
}