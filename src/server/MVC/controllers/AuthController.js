import express from "express";
import CustomPassport from "../../utils/security/auth/CustomPassport.js";
import CustomJwt from "../../utils/security/auth/CustomJwt.js";
import CustomProcess from "../../utils/configure/CustomProcess.js";

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

    constructor({
                    _router = express.Router(),
                    _passport = new CustomPassport(),
                    _jwt = new CustomJwt(),
                    _process = new CustomProcess()
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.router = _router;
        this.#passport = _passport;
        this.#jwt = _jwt;
        this.#process = _process;

        this.routerInitialize();
    }

    routerInitialize() {
        this.router.get('/auth/github', this.#passport.authenticate('github').bind(this));
        this.router.get('/auth/github/callback', this.#passport.authenticateCallback('github').bind(this), this.jwtGenerator.bind(this));

        this.router.get('/auth/kakao', this.#passport.authenticate('kakao').bind(this));
        this.router.get('/auth/kakao/callback', this.#passport.authenticateCallback('kakao').bind(this), this.jwtGenerator.bind(this));
    }

    jwtGenerator = async (req, res) => {
        this.#jwt.sign(req.user);
        return res.redirect('/');
    }

    jwtVerifier = async (req, res) => {
        const token = req.cookies[this.#process.env.JWT_TOKEN_NAME];
        const result = this.#jwt.verify(token);
        return res.status(200).json(result);
    }
}