import express from "express";
import cookieParser from "cookie-parser";
import ZariRouter from "./src/server/MVC/routers/ZariRouter.js";
import NotFoundHandler from "./src/server/utils/exception_handlers/not-found-handler.js";
import ErrorHandler from "./src/server/utils/exception_handlers/error-handler.js";
import SwaggerSpec from "./src/server/utils/openapis/swagger-spec.js";
import customMorgan from "./src/server/utils/configure/custom-morgan.js";
import customCors from "./src/server/utils/security/custom-cors.js";
import customHelmet from "./src/server/utils/security/custom-helmet.js";
import AuthRouter from "./src/server/MVC/routers/AuthRouter.js";
import session from "express-session";
import CustomJwtPassport from "./src/server/utils/security/auth/CustomJwtPassport.js";
import CustomGithubPassport from "./src/server/utils/security/auth/CustomGithubPassport.js";

export default class App {
    static #instance;

    #express = express();
    #customJwtPassport = new CustomJwtPassport();
    #customGithubPassport = new CustomGithubPassport();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#preProcess();
        this.#routerInitialize();
        this.#exceptionHandler();
    }

    #preProcess() {
        let staticOptions = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
        };
        this.#express.use(session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false } // Set to 'true' if you are using HTTPS
        }));
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(express.static('public', staticOptions));
        this.#express.use(cookieParser());
        this.#express.use(customMorgan.morgan());
        this.#express.use(customCors.cors());
        this.#express.use(customHelmet.helmet());
        this.#express.use(this.#customJwtPassport.initialize());
        this.#express.use(this.#customGithubPassport.initialize());
    }

    #routerInitialize() {
        this.#express.use('/api-docs', SwaggerSpec.server, SwaggerSpec.setup());
        this.#express.use('/api', new ZariRouter().router);
        this.#express.use('/auth',new AuthRouter().router);
    }

    #exceptionHandler() {
        this.#express.use(NotFoundHandler.notFound);
        this.#express.use(ErrorHandler.errorHandler);
    }

    listen(...args) {
        this.#express.listen(...args);
    }
}