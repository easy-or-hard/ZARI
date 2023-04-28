import express from "express";
import CustomPassport from "../../utils/security/auth/CustomPassport.js";
import CustomJwt from "../../utils/security/auth/CustomJwt.js";
import CustomProcess from "../../utils/configure/CustomProcess.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";
import ByeolService from "../services/ByeolService.js";
import ByeolController from "./ByeolController.js";

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
 *     KakaoAuth:
 *       type: oauth2
 *       flows:
 *         authorizationCode:
 *           authorizationUrl: https://kauth.kakao.com/oauth/authorize
 *           tokenUrl: https://kauth.kakao.com/oauth/token
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
        this.#byeolService = _byeolService;

        this.routerInitialize();
    }

    routerInitialize() {
        this.#logger.info('routerInitialize');
        this.router.use('/api', this.jwtVerifier);

        for (const auth of CustomPassport.authenticatable) {
            this.router.get(`/auth/${auth}`, this.#passport.authenticate(auth).bind(this));
            this.router.get(`/auth/${auth}/callback`, this.#passport.authenticateCallback(auth).bind(this), this.jwtGenerator, this.signUpIfNewUser);
        }
    }

    /**
     * JWT 생성 미들웨어
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    jwtGenerator = async (req, res, next) => {
        this.#logger.info('jwtGenerator');
        const token = this.#jwt.sign(req.user);
        res.cookie(this.#process.env.JWT_TOKEN_NAME, token);
        return next();
    }


    /**
     * JWT 인증 미들웨어
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    jwtVerifier = async (req, res, next) => {
        try {
            const token = req.cookies[this.#process.env.JWT_TOKEN_NAME];
            const byeol = await this.#jwt.verifyAndGetPayload(token);
            req.user = byeol;
            this.#logger.info('jwtVerifier', 'JWT 인증 성공');
            return next();
        } catch (err) {
            this.#logger.info('jwtVerifier', 'JWT 인증 실패');
            this.#logger.error('jwtVerifier', err);
            res.clearCookie(this.#process.env.JWT_TOKEN_NAME);
            this.#logger.info(`${this.#process.env.JWT_TOKEN_NAME} 쿠키 삭제`);
            return next(err);
        }
    }

    /**
     * 기존에 없던, 새로운 유저라면 회원가입
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    signUpIfNewUser = async (req, res, next) => {
        this.#logger.info('signUpIfNewUser');
        const byeol = req.user;
        const userExists = await this.#byeolService.userExists(byeol.providerId, byeol.provider);
        if (!userExists) {
            await this.#byeolService.create(byeol);
            return res.redirect('/');
        }

        return next();
    }
}