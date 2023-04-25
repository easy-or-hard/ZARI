import express from "express";
import CustomGithubPassport from "../../utils/security/auth/CustomGithubPassport.js";

export default class AuthRouter {
    static #instance;
    router= express.Router();
    #customGithubPassport = new CustomGithubPassport();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#routeInitialize();
    }

    #routeInitialize() {
        this.router.get('/github', this.#customGithubPassport.authenticate());
        this.router.get('/github/callback', this.#customGithubPassport.authenticateMiddleware(), this.#customGithubPassport.jwtGenerator);
        this.router.get('/failure', (req, res) => {
            res.status(200).send('Authentication failed. Please try again.');
        });
    }
}