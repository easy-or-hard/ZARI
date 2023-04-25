import express from "express";
import AuthController from "../controllers/AuthController.js";
import CustomGithubPassport from "../../utils/security/auth/CustomGithubPassport.js";

export default class AuthRouter {
    static #instance;
    router= express.Router();
    #controller = new AuthController();
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
        this.router.get('/github/callback', this.#customGithubPassport.authenticate2(), this.#controller.githubCallback);
        this.router.get('/auth/failure', (req, res) => {
            res.status(200).send('Authentication failed. Please try again.');
        });
    }
}