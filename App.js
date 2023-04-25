import express from "express";
import cookieParser from "cookie-parser";
import ZariRouter from "./src/server/MVC/routers/ZariRouter.js";
import ExceptionRouter from "./src/server/utils/exceptionRouters/ExceptionRouter.js";
import SwaggerSpec from "./src/server/utils/openapis/SwaggerSpec.js";
import customMorgan from "./src/server/utils/configure/custom-morgan.js";
import CustomCors from "./src/server/utils/security/CustomCors.js";
import customHelmet from "./src/server/utils/security/custom-helmet.js";
import AuthRouter from "./src/server/MVC/routers/AuthRouter.js";
import CustomGithubPassport from "./src/server/utils/security/auth/CustomGithubPassport.js";

export default class App {
    static #instance;

    #express = express();
    #customGithubPassport = new CustomGithubPassport();
    #exceptionRouter = new ExceptionRouter();
    #swaggerSpec = new SwaggerSpec();
    #customCors = new CustomCors();
    #authRouter = new AuthRouter();
    #zariRouter = new ZariRouter();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#preProcessRouterInitialize();
        this.#businessRouterInitialize();
        this.#exceptionRouterInitialize();
    }

    #preProcessRouterInitialize() {
        let staticOptions = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
        };
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(express.static('public', staticOptions));
        this.#express.use(cookieParser());
        this.#express.use(customMorgan.morgan());
        this.#express.use(this.#customCors.cors());
        this.#express.use(customHelmet.helmet());
        this.#express.use(this.#customGithubPassport.initialize());
        this.#express.use('/api', this.#customGithubPassport.jwtVerify)
    }

    #businessRouterInitialize() {
        this.#express.use('/api-docs', this.#swaggerSpec.server, this.#swaggerSpec.setup);
        this.#express.use('/auth', this.#authRouter.router);
        this.#express.use('/api', this.#zariRouter.router);
    }

    #exceptionRouterInitialize() {
        this.#express.use(this.#exceptionRouter.notFound);
        this.#express.use(this.#exceptionRouter.errorHandler);
    }

    listen(...args) {
        this.#express.listen(...args);
    }
}