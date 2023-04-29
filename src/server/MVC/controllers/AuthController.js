import express from "express";
import CustomPassport from "../../utils/security/auth/CustomPassport.js";
import CustomJwt from "../../utils/security/auth/CustomJwt.js";
import CustomProcess from "../../utils/configure/CustomProcess.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import ByeolService from "../services/ByeolService.js";
import ByeolController from "./ByeolController.js";
import Byeol from "../models/Byeol.js";
import {NotVaildatedAccessError} from "../../utils/errors/CustomError.js";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     GitHubAuth:
 *       type: oauth2
 *       flows:
 *         authorizationCode:
 *           authorizationUrl: https://github.com/login/oauth/authorize
 *           tokenUrl: https://github.com/login/oauth/access_token
 *           scopes: {}
 */
export default class AuthController {
    /**
     * @type {AuthController}
     */
    static #instance;

    /**
     * @type {*|Router}
     */
    router;

    /**
     * @type {CustomPassport}
     */
    #passport;

    /**
     * @type {CustomJwt}
     */
    #jwt;

    /**
     * @type {CustomProcess}
     */
    #process;

    /**
     * @type {CustomLogger}
     */
    #logger;

    /**
     * @type {ByeolController}
     */
    #byeolController;

    /**
     * @type {Byeol}
     */
    #byeolModel;
    /**
     * @type {ByeolService}
     */
    #byeolService;


    constructor({
                    _router = express.Router(),
                    _passport = new CustomPassport(),
                    _jwt = new CustomJwt(),
                    _process = new CustomProcess(),
                    _logger = new CustomLogger(),
                    _byeolController = new ByeolController(),
                    _byeolModel = Byeol,
                    _byeolService = new ByeolService(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.router = _router;
        this.#passport = _passport;
        this.#jwt = _jwt;
        this.#process = _process;
        this.#logger = _logger;
        this.#byeolController = _byeolController;
        this.#byeolModel = _byeolModel;
        this.#byeolService = _byeolService;

        this.routerInitialize();
    }

    routerInitialize() {
        this.#logger.info('routerInitialize');
        this.router.get('/api/byeol', this.jwtVerifier); // 세션에 유저 정보를 넣어주고, 읽을 때 바로 자신의 별 정보를 가져올 수 있도록 한다.

        this.router.post('*', this.jwtVerifier);
        this.router.put('*', this.jwtVerifier);
        this.router.delete('*', this.jwtVerifier);

        for (const auth of CustomPassport.authenticatable) {
            this.router.get(`/auth/${auth}`, this.#passport.authenticate(auth).bind(this));
            this.router.get(`/auth/${auth}/callback`, this.#passport.authenticateCallback(auth).bind(this), this.signUpIfNewUser, this.jwtGenerator);
        }
    }

    /**
     * JWT 생성 미들웨어
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    jwtGenerator = async (req, res, next) => {
        this.#logger.info('jwtGenerator');
        const token = this.#jwt.sign(req.user);
        res.cookie(this.#process.env.JWT_TOKEN_NAME, token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        return res.redirect('/');
    }

    /**
     * JWT 인증 미들웨어
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    jwtVerifier = async (req, res, next) => {
        try {
            const token = req.cookies[this.#process.env.JWT_TOKEN_NAME];
            req.user = await this.#jwt.verifyAndGetPayload(token);
            this.#logger.info('jwtVerifier', 'JWT 인증 성공');
            return next();
        } catch (err) {
            this.#logger.info('jwtVerifier', 'JWT 인증 실패');
            this.#logger.error('jwtVerifier', err);
            res.clearCookie(this.#process.env.JWT_TOKEN_NAME);
            this.#logger.info(`${this.#process.env.JWT_TOKEN_NAME} 쿠키 삭제`);
            return next(new NotVaildatedAccessError());
        }
    }

    /**
     * 기존에 없던, 새로운 유저라면 회원가입
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    signUpIfNewUser = async (req, res, next) => {
        this.#logger.info('signUpIfNewUser');
        const byeol = req.user;
        const userExists = await this.#byeolService.userExists(byeol.providerId, byeol.provider);
        let byeolInstance;
        if (!userExists) {
            byeolInstance = await this.#byeolService.create(byeol);
        } else {
            const condition = {
                where: {
                    providerId: byeol.providerId,
                    provider: byeol.provider,
                }
            }
            byeolInstance = await this.#byeolModel.findOne(condition);
        }

        // passport가 넣어준 profile 객체의 id를 내 데이터베이스의 id로 넣어준다.
        req.user.id = byeolInstance.id;

        return next();
    }
}