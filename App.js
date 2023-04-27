import express from "express";
import cookieParser from "cookie-parser";
import ZariRouter from "./src/server/MVC/routers/ZariRouter.js";
import ExceptionRouter from "./src/server/utils/exceptionRouters/ExceptionRouter.js";
import SwaggerSpec from "./src/server/utils/openapis/SwaggerSpec.js";
import CustomMorgan from "./src/server/utils/configure/CustomMorgan.js";
import CustomCors from "./src/server/utils/security/CustomCors.js";
import CustomHelmet from "./src/server/utils/security/CustomHelmet.js";
import AuthRouter from "./src/server/MVC/routers/AuthRouter.js";
import CustomPassport from "./src/server/utils/security/auth/CustomPassport.js";

export default class App {
    /**
     * @type {express}
     */
    #express;
    /**
     * @type {CustomPassport}
     */
    #customGithubPassport;
    /**
     * @type {ExceptionRouter}
     */
    #exceptionRouter;
    /**
     * @type {SwaggerSpec}
     */
    #swaggerSpec;
    /**
     * @type {CustomCors}
     */
    #customCors;
    /**
     * @type {AuthRouter}
     */
    #authRouter;
    /**
     * @type {CustomMorgan}
     */
    #customMorgan;
    /**
     * @type {CustomHelmet}
     */
    #customHelmet;
    /**
     * @type {ZariRouter}
     */
    #zariRouter;

    constructor(
        express = express(),
        customGithubPassport = new CustomPassport(),
        exceptionRouter = new ExceptionRouter(),
        swaggerSpec = new SwaggerSpec(),
        customCors = new CustomCors(),
        authRouter = new AuthRouter(),
        customMorgan = new CustomMorgan(),
        customHelmet = new CustomHelmet(),
        zariRouter = new ZariRouter()
    ) {
        this.#express = express;
        this.#customGithubPassport = customGithubPassport;
        this.#exceptionRouter = exceptionRouter;
        this.#swaggerSpec = swaggerSpec;
        this.#customCors = customCors;
        this.#authRouter = authRouter;
        this.#customMorgan = customMorgan;
        this.#customHelmet = customHelmet;
        this.#zariRouter = zariRouter;
        
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
        this.#express.use(this.#customMorgan.morgan());
        this.#express.use(this.#customCors.cors());
        this.#express.use(this.#customHelmet.helmet());
        this.#express.use(this.#customGithubPassport.initialize);
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