import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const { Express, Request, Response, NextFunction } = express;
import helmet from "helmet";
import morgan from "morgan";
import ZodiacUniverseRouter from "./routes/ZodiacUniverseRoutes.js";
import NotFoundHandler from "./handlers/NotFoundHandler.js";
import ErrorHandler from "./handlers/ErrorHandler.js";

class App {
    /**
     * @type {Express}
     */
    #express;

    constructor() {
        this.#express = express();
        this.#preProcess();
        this.#routerInitialize();
        this.#exceptionHandler();
    }

    #preProcess = () => {
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
        let corsOptions = {
            origin: 'http://localhost:8080',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            credentials: true, // Access-Control-Allow-Credentials
        }

        this.#express.use(express.json());
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(express.static('public', staticOptions));
        this.#express.use(cors(corsOptions));
        this.#express.use(cookieParser());
        this.#express.use(morgan('dev'));
        this.#express.use(helmet());
    }

    #routerInitialize = () => {
        this.#express.use('/api', ZodiacUniverseRouter.instanceRouter);


    }

    #exceptionHandler = () => {
        this.#express.use(NotFoundHandler.notFound);
        this.#express.use(ErrorHandler.errorHandler);
    }

    start = () => {
        this.#express.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    }
}

new App().start();