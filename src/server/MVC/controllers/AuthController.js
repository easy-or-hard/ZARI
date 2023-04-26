import AuthService from "../services/AuthService.js";
import express from "express";
import CustomPassport from "../../utils/security/auth/CustomPassport.js";
import CustomJwt from "../../utils/security/auth/CustomJwt.js";
import CustomProcess from "../../utils/configure/CustomProcess.js";

export default class AuthController {
    /**
     * @type {AuthController}
     */
    static #instance;

    /**
     *
     * @type {*|Router}
     */
    router = express.Router();

    /**
     * @type {AuthService}
     */
    #service;

    /**
     * @type {CustomPassport}
     */
    #customPassport = new CustomPassport();

    #customJwt = new CustomJwt();
    #customProcess = new CustomProcess();

    constructor(authService = new AuthService()) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#service = authService;
        this.routerInitialize();
    }

    routerInitialize() {
        this.router.post("/sign-up", this.signUp.bind(this));
        this.router.post("/sign-in", this.signIn.bind(this));
        this.router.post("/sign-out", this.signOut.bind(this));

        this.router.get('/github', this.#customPassport.authenticate('github'));
        this.router.get('/github/callback', this.#customPassport.authenticateCallback('github'), this.jwtGenerator);
    }

    async signUp(req, res) {
        const profile = req.user;
        const result = await this.#service.signIn(profile);
        res.status(201).json(result);
    }

    async signIn(req, res) {
        const profile = req.user;
        const result = await this.#service.signIn(profile);
        res.status(200).json(result);
    }

    async signOut(req, res) {
        req.clearCookie("jwt");
        res.status(200);
    }

    jwtGenerator = async (req, res) => {
        this.#customJwt.sign(req.user);
        return res.redirect('/');
    }

    jwtVerifier = async (req, res) => {
        const token = req.cookies[this.#customProcess.env.JWT_TOKEN_NAME];
        const result = this.#customJwt.verify(token);
        return res.status(200).json(result);
    }
}