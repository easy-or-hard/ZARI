import express from "express";
import cookieParser from "cookie-parser";
import ZodiacUniverseRoutes from "./src/server/MVC/routes/zari.js";
import NotFoundHandler from "./src/server/utils/exception_handlers/not-found-handler.js";
import ErrorHandler from "./src/server/utils/exception_handlers/error-handler.js";
import SwaggerSpec from "./src/server/utils/openapis/swagger-spec.js";
import customMorgan from "./src/server/utils/configure/custom-morgan.js";
import customCors from "./src/server/utils/security/custom-cors.js";
import customHelmet from "./src/server/utils/security/custom-helmet.js";
import Zari from "./src/server/MVC/models/Zari.js";
import Banzzack from "./src/server/MVC/models/Banzzack.js";
import Byeol from "./src/server/MVC/models/Byeol.js";

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
        this.#databaseInitialize();
    }

    #preProcess() {
        let staticOptions = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
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

    #databaseInitialize() {
        Zari.associate();
        Byeol.associate();
        Banzzack.associate();
    }

    listen(...args) {
        this.#express.listen(...args);
    }
}