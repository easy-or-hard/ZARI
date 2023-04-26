import express from "express";
import CustomPassport from "../../utils/security/auth/CustomPassport.js";

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
export default class AuthRouter {
    static #instance;
    router= express.Router();
    #customGithubPassport = new CustomPassport();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#routeInitialize();
    }

    #routeInitialize() {
        /**
         * @swagger
         * /auth/github:
         *   get:
         *     tags: [Authentication]
         *     description: Authenticate user using GitHub OAuth
         *     responses:
         *       302:
         *         description: Redirect to GitHub authorization page
         */
        this.router.get('/github', this.#customGithubPassport.authenticateGithub);
        /**
         * @swagger
         * /auth/github/callback:
         *   get:
         *     tags: [Authentication]
         *     description: Callback endpoint for GitHub OAuth
         *     responses:
         *       200:
         *         description: Authentication successful, JWT generated
         *       401:
         *         description: Authentication failed
         */
        this.router.get('/github/callback', this.#customGithubPassport.authenticateGithubCallback, this.#customGithubPassport.jwtGenerator);

        /**
         * @swagger
         * /auth/kakao:
         *   get:
         *     tags: [Authentication]
         *     description: Authenticate user using Kakao OAuth
         *     responses:
         *       302:
         *         description: Redirect to Kakao authorization page
         */
        this.router.get('/kakao', this.#customGithubPassport.authenticateKakao);

        /**
         * @swagger
         * /auth/kakao/callback:
         *   get:
         *     tags: [Authentication]
         *     description: Callback endpoint for Kakao OAuth
         *     responses:
         *       200:
         *         description: Authentication successful, JWT generated
         *       401:
         *         description: Authentication failed
         */
        this.router.get('/kakao/callback', this.#customGithubPassport.authenticateKakaoCallback, this.#customGithubPassport.jwtGenerator);
    }
}