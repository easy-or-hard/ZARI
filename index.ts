// node module
import express from "express";
import log4js, {Logger} from "log4js";

import ApiRouter from "./routes/ApiRouter";
import SwaggerRouter from "./routes/Swagger";

/**
 * variable declaration
 */
let port: number = 80;
let loggerLevel: string = "debug";

class App {
    private static readonly app : express.Application = express();
    private static readonly port : number = port;

    static serverStart() {
        this.app.use("/api", ApiRouter.router);


        this.loggerInit();
        this.listen();
    }

    private static loggerInit(): Logger {
        let logger: Logger = log4js.getLogger();
        logger.level = loggerLevel;
        return logger;
    }

    private static listen() {
        this.app.listen(this.port, () => {
            log4js.getLogger().info(`server started, port : ${this.port}`);
        });
    }
}

App.serverStart();