// node module
import express from "express";
import log4js, {Logger} from "log4js";

// project implement
import HtmlRouter from "./router/implement/HtmlRouter";
import ApiRouter from "./router/implement/ApiRouter";

// const
import ENVIRONMENT_CONST from "./conf/ENVIROMENT_CONST";
import DEFAULT_CONST from "./conf/SERVICE_CONST"


class App {
    static readonly app : express.Application = express();
    static readonly port : number = DEFAULT_CONST.PORT;

    static serverStart() {
        HtmlRouter.setRoute(this.app);
        ApiRouter.setRoute(this.app);

        this.loggerInit();
        this.listen();
    }

    private static loggerInit(): Logger {
        let logger: Logger = log4js.getLogger();
        logger.level = ENVIRONMENT_CONST.LOGGER_LEVEL || DEFAULT_CONST.LOGGER_LEVEL;
        return logger;
    }

    private static listen() {
        this.app.listen(this.port, () => {
            log4js.getLogger().info(`server started, port : ${this.port}`);
        });
    }
}

App.serverStart();