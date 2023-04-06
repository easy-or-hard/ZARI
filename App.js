import express from "express";
import cookieParser from "cookie-parser";
import ZodiacUniverseRoutes from "./routes/ZodiacUniverseRoutes.js";
import NotFoundHandler from "./handlers/NotFoundHandler.js";
import ErrorHandler from "./handlers/ErrorHandler.js";
import SwaggerSpec from "./openapis/SwaggerSpec.js";
import customProcess from "./configure/customProcess.js";
import customMorgan from "./configure/customMorgan.js";
import customLogger from "./handlers/customLogger.js";
import customCors from "./security/customCors.js";
import customHelmet from "./security/customHelmet.js";

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
        this.#express.use(customMorgan.morgan());
        this.#express.use(customCors.cors());
        this.#express.use(customHelmet.helmet());
    }

    #routerInitialize() {
        this.#express.use('/api-docs', SwaggerSpec.server, SwaggerSpec.setup());
        this.#express.use('/api', ZodiacUniverseRoutes.router);
    }

    #exceptionHandler() {
        this.#express.use(NotFoundHandler.notFound);
        this.#express.use(ErrorHandler.errorHandler);
    }

    listen() {
        this.#express.listen(customProcess.env.PORT,
            () => {
                customLogger.info(`Server is running on port ${customProcess.env.PORT}`);}
        );
    }
}