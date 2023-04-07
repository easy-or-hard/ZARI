import express from "express";
import cookieParser from "cookie-parser";
import ZodiacUniverseRoutes from "./src/routes/zodiac-universe-routes.js";
import NotFoundHandler from "./src/exception_handlers/not-found-handler.js";
import ErrorHandler from "./src/exception_handlers/error-handler.js";
import SwaggerSpec from "./src/openapis/swagger-spec.js";
import customMorgan from "./src/configure/custom-morgan.js";
import customCors from "./src/security/custom-cors.js";
import customHelmet from "./src/security/custom-helmet.js";

export default new class App {
    static #instance;

    #express = express();

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
            setHeaders: function (res, path, stat) {
                res.set('x-timestamp', Date.now());
            }
        }

        this.#express.use(express.json());
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(express.static('public', staticOptions));
        this.#express.use(cookieParser());
        // this.#express.use(customMorgan.morgan());
        // this.#express.use(customCors.cors());
        // this.#express.use(customHelmet.helmet());
    }

    #routerInitialize() {
        this.#express.use('/api-docs', SwaggerSpec.server, SwaggerSpec.setup());
        this.#express.use('/api', ZodiacUniverseRoutes.router);
    }

    #exceptionHandler() {
        this.#express.use(NotFoundHandler.notFound);
        this.#express.use(ErrorHandler.errorHandler);
    }

    listen(...args) {
        this.#express.listen(...args);
    }
}