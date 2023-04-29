import express from "express";
import cookieParser from "cookie-parser";
import ExceptionRouter from "./src/server/utils/exceptionRouters/ExceptionRouter.js";
import CustomSwaggerSpec from "./src/server/utils/openapis/CustomSwaggerSpec.js";
import CustomMorgan from "./src/server/utils/configure/CustomMorgan.js";
import CustomCors from "./src/server/utils/security/CustomCors.js";
import CustomHelmet from "./src/server/utils/security/CustomHelmet.js";
import CustomPassport from "./src/server/utils/security/auth/CustomPassport.js";
import CustomExpress from "./src/server/utils/configure/CustomExpress.js";
import AuthController from "./src/server/MVC/controllers/AuthController.js";
import ByeolController from "./src/server/MVC/controllers/ByeolController.js";
import ZodiacController from "./src/server/MVC/controllers/ZodiacController.js";

export default class App {
    /**
     * @type {Express}
     */
    #express;

    /**
     * @type {CustomExpress}
     */
    #customExpress;

    /**
     * @type {CustomPassport}
     */
    #customGithubPassport;

    /**
     * @type {ExceptionRouter}
     */
    #exceptionRouter;

    /**
     * @type {CustomSwaggerSpec}
     */
    #swaggerSpec;

    /**
     * @type {CustomCors}
     */
    #customCors;

    /**
     * @type {CustomMorgan}
     */
    #customMorgan;

    /**
     * @type {CustomHelmet}
     */
    #customHelmet;

    /**
     * @type {AuthController}
     */
    #authController;

    /**
     * @type {ByeolController}
     */
    #byeolController;
    #zodiacController;

    constructor({
                    _express = express(),
                    _customExpress = new CustomExpress(),
                    _customGithubPassport = new CustomPassport(),
                    _exceptionRouter = new ExceptionRouter(),
                    _swaggerSpec = new CustomSwaggerSpec(),
                    _customCors = new CustomCors(),
                    _customMorgan = new CustomMorgan(),
                    _customHelmet = new CustomHelmet(),
                    _authController = new AuthController(),
                    _byeolController = new ByeolController(),
                    _zodiacController = new ZodiacController(),
                } = {}) {
        this.#express = _express;
        this.#customExpress = _customExpress;
        this.#customGithubPassport = _customGithubPassport;
        this.#exceptionRouter = _exceptionRouter;
        this.#swaggerSpec = _swaggerSpec;
        this.#customCors = _customCors;
        this.#customMorgan = _customMorgan;
        this.#customHelmet = _customHelmet;
        this.#authController = _authController;
        this.#byeolController = _byeolController;
        this.#zodiacController = _zodiacController;

        // this.#test();
        this.#preProcessRouterInitialize();
        this.#businessRouterInitialize();
        this.#exceptionRouterInitialize();
    }

    #preProcessRouterInitialize() {
        this.#express.use(this.#customExpress.json);
        this.#express.use(this.#customExpress.urlencoded);
        this.#express.use(this.#customExpress.static);
        this.#express.use(cookieParser());
        this.#express.use(this.#customMorgan.morgan);
        this.#express.use(this.#customCors.cors);
        this.#express.use(this.#customHelmet.helmet);
        this.#express.use(this.#customGithubPassport.initialize);
    }

    #businessRouterInitialize() {
        this.#express.use(this.#authController.router);
        this.#express.use(this.#byeolController.router);
        this.#express.use(this.#zodiacController.router);
        this.#express.use('/api-docs', this.#swaggerSpec.serve, this.#swaggerSpec.setup);
    }

    #exceptionRouterInitialize() {
        this.#express.use(this.#exceptionRouter.notFound);
        this.#express.use(this.#exceptionRouter.errorHandler);
    }

    listen(...args) {
        this.#express.listen(...args);
    }

    #test() {
        this.#express.use('/', (req, res) => {
            res.send('Hello World!');
        });
    }
}