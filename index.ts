import express from "express";
import HtmlRouter from "./router/implement/HtmlRouter";
import ApiRouter from "./router/implement/ApiRouter";

class App {
    static readonly app : express.Application = express();
    static readonly port : number = 3000;

    static serverStart() {
        HtmlRouter.setRoute(this.app);
        ApiRouter.setRoute(this.app);

        this.listen();
    }

    private static listen() {
        this.app.listen(this.port, () => {
            `server started, http://localhost:${this.port}`
        });
    }
}

App.serverStart();