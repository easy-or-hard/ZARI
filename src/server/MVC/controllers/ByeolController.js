import CustomLogger from "../../lib/configure/CustomLogger.js";
import express from "express";
import ByeolService from "../services/ByeolService.js";
import ZodiacService from "../services/ZodiacService.js";
import Byeol from "../models/Byeol.js";
import CustomProcess from "../../lib/configure/CustomProcess.js";

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
     * @type {ZodiacService}
     */
    #zodiacService;

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
                    _zodiacService = new ZodiacService(),
                    _logger = new CustomLogger(),
                    _process = new CustomProcess(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }

        this.router = _router;
        this.#byeol = _byeol;
        this.#byeolService = _byeolService;
        this.#zodiacService = _zodiacService;
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
             *       - GitHubAuth: []
             *     responses:
             *       200:
             *         description: 별 정보가 성공적으로 검색됨
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/Byeol'
             *       401:
             *         $ref: '#/components/responses/UnauthorizedError'
             *       500:
             *         $ref: '#/components/responses/InternalServerError'
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
             *       - GitHubAuth: []
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
             *         $ref: '#/components/responses/EmptyNameError'
             *       409:
             *         $ref: '#/components/responses/NameAlreadyExistsError'
             *       500:
             *         $ref: '#/components/responses/InternalServerError'
             */
            .put(this.update);

        /**
         * @swagger
         * /api/byeol/{name}:
         *   get:
         *     summary: 별 이름으로 별 조회
         *     description: 입력된 별 이름을 이용하여 별을 조회합니다.
         *     tags:
         *       - Byeol
         *     parameters:
         *       - in: path
         *         name: name
         *         required: true
         *         description: 조회할 별의 이름
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: 조회된 별 정보
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Byeol'
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.router.get('/api/byeol/:name', this.readByName);
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
         *       401:
         *         $ref: '#/components/responses/EmptyNameError'
         *       409:
         *         $ref: '#/components/responses/NameAlreadyExistsError'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
         */
        this.router.get('/api/byeol/is-can-use-name/:name', this.isCanUseName);
        /**
         * @swagger
         * /api/byeol/zodiac:
         *   put:
         *     summary: 별의 별자리를 선택합니다. 최초 한 번만 설정가능하며, 수정할 수 없습니다.
         *     description: 인증된 사용자의 별의 별자리를 선택합니다.
         *     tags:
         *       - Byeol
         *     security:
         *       - GitHubAuth: []
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
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
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
         *       - GitHubAuth: []
         *     responses:
         *       200:
         *         description: 별과 별에 기록된 반짝임 삭제 성공.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "별이 삭제되었습니다. 별에 기록된 반짝임도 삭제되었습니다."
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         *       500:
         *         $ref: '#/components/responses/InternalServerError'
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
        const byeol = await this.#byeolService.read(user.id);
        return res.json(byeol);
    }

    readByName = async (req, res, next) => {
        const {name} = req.params;
        const byeol = await this.#byeolService.readByName(name);
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
            return res.send("별의 이름이 변경되었습니다.");
        } catch (e) {
            return next(e);
        }
    }

    isCanUseName = async (req, res, next) => {
        try {
            const {name} = req.params;
            await this.#byeolService.validateEmptyName(name);
            await this.#byeolService.validateExistsName(name);
            res.send("사용 가능한 이름입니다.");
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
            return res.status(200).send("별이 삭제되었습니다. 별에 기록되었던 반짝이도 삭제 되었습니다.");
        } catch (e) {
            return next(e);
        }
    }
}