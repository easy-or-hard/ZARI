import express from "express";
import CustomPassport from "../../lib/security/auth/CustomPassport.js";
import CustomJwt from "../../lib/security/auth/CustomJwt.js";
import CustomProcess from "../../lib/configure/CustomProcess.js";
import CustomLogger from "../../lib/configure/CustomLogger.js";
import ByeolService from "../services/ByeolService.js";
import ByeolController from "./ByeolController.js";
import Byeol from "../models/Byeol.js";
import {UnauthorizedError} from "../../lib/errors/CustomError.js";
import AuthService from "../services/AuthService.js";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     GitHubAuth:
 *       type: oauth2
 *       description: 깃허브 인증 입니다. 따로 키 넣는건 귀찮으니까, {사용중인도메인}/auth/github 로 접속하면 SIGN-IN 상태가 됩니다. 정확히는 어떻게 사용하는건지 몰루...;; ㅎㅎ
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

    /**
     * @type {AuthService}
     */
    #authService;

    constructor({
                    _router = express.Router(),
                    _passport = new CustomPassport(),
                    _jwt = new CustomJwt(),
                    _process = new CustomProcess(),
                    _logger = new CustomLogger(),
                    _byeolController = new ByeolController(),
                    _byeolModel = Byeol,
                    _byeolService = new ByeolService(),
                    _authService = new AuthService(),
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
        this.#authService = _authService;

        this.routerInitialize();
    }

    routerInitialize() {
        this.#logger.info('routerInitialize');

        // JWT TOKEN 리프레시는 라우터 최상단에 위치해야 합니다.
        this.router.route('/api/*')
            .get(this.jwtTokenRefresh)
            .post(this.jwtTokenRefresh)
            .put(this.jwtTokenRefresh)
            .delete(this.jwtTokenRefresh);

        /**
         * @swagger
         * /api/auth:
         *   get:
         *     summary: 가능한 인증 목록 반환
         *     tags: [Auth]
         *     description: 사용 가능한 인증 제공자 목록을 반환합니다. http://현재사용중인도메인/auth/github 로 접속하면 로그인 페이지로 리다이렉트 됩니다. 새 창에서 접속하세요.
         *     responses:
         *       200:
         *         description: 사용 가능한 인증 제공자 목록을 반환.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   provider:
         *                     type: string
         *                   url:
         *                     type: string
         *             example:
         *               - provider: google
         *                 url: "/auth/google"
         *               - provider: github
         *                 url: "/auth/github"
         */
        this.router.get('/auth/provider', this.authProvider);

        /**
         * 특별히 이 GET 메소드만 인증을 합니다. 나머지 GET은 인증을 하지 않습니다.
         * 더 나이스한 디자인이 있으면 바꿔주세요.
         */
        this.router.get('/api/byeol', this.statusSignIn);

        this.router.post('*', this.statusSignIn);
        this.router.put('*', this.statusSignIn);
        this.router.delete('*', this.statusSignIn);

        for (const auth of CustomPassport.authProviderList) {
            this.router.get(`/auth/${auth}`, this.#passport.authenticate(auth).bind(this));
            this.router.get(`/auth/${auth}/callback`, this.#passport.authenticateCallback(auth).bind(this), this.signUpIfNewUser, this.jwtTokenGenerator, this.authorizationComplete);
        }

        this.router.get('/auth/sign-out', this.authSignOut);
        this.router.get('/auth/complete', this.authComplete);
    }


    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    jwtTokenRefresh = async (req, res, next) => {
        this.#logger.info('jwtTokenRefresh');
        try {
            let jwtToken = this.#authService.extractJwtToken(req);
            if (jwtToken) {
                jwtToken = await this.#jwt.refresh(jwtToken);
                req.user = await this.#jwt.verifyAndGetPayload(jwtToken);
                this.#embedJwtTokenInResponse(res, jwtToken);
            }

            return next();
        } catch (e) {
            this.#logger.info('jwtRefresh', 'JWT TOKEN 인증 실패');
            this.#logger.error('jwtRefresh', e);
            res.clearCookie(this.#process.env.JWT_TOKEN_NAME);
            this.#logger.info(`${this.#process.env.JWT_TOKEN_NAME} 쿠키 삭제`);
            return next(new UnauthorizedError());
        }
    }

    authComplete = async (req, res, next) => {
        this.#logger.info('authComplete');
        return res.json({message: 'authorization success, 창을 닫으셔도 됩니다.'});
    }

    authSignOut = async (req, res, next) => {
        this.#logger.info('authSignOut');
        res.clearCookie(this.#process.env.JWT_TOKEN_NAME);
        return res.json({message: 'sign-out success'});
    }

    authProvider = async (req, res, next) => {
        this.#logger.info('authProvider');
        const authProviderList = CustomPassport.authProviderList;
        const resultAuthProviderList = [];
        for (const provider of authProviderList) {
            const instance = {
                provider: provider,
                url: `/auth/${provider}`
            }
            resultAuthProviderList.push(instance);
        }
        return res.json(resultAuthProviderList);
    }

    /**
     * JWT TOKEN 생성 미들웨어
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    jwtTokenGenerator = async (req, res, next) => {
        this.#logger.info('jwtTokenGenerator');
        const jwtToken = this.#jwt.sign(req.user);
        this.#embedJwtTokenInResponse(res, jwtToken);
        return next();
    }

    #embedJwtTokenInResponse = (res, jwtToken) => {
        res.set('Authorization', `Bearer ${jwtToken}`);
        res.cookie(this.#process.env.JWT_TOKEN_NAME, jwtToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: 'strict',
        });
    }

    authorizationComplete = async (req, res, next) => {
        this.#logger.info('authorizationComplete');
        return res.redirect('/auth/complete');
    }

    /**
     * SIGN-IN 상태 확인 미들웨어
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<*>}
     */
    statusSignIn = async (req, res, next) => {
        try {
            this.#logger.info('statusSignIn');
            this.#authService.validateAuthenticatedUser(req.user);
            return next();
        } catch (e) {
            next(e);
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