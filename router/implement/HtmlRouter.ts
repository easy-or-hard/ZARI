import e from "express";
import AbstractRouter from "../abstract/AbstractRouter";

/**
 * {@link AbstractRouter}
 */
export default class HtmlRouter extends AbstractRouter {
    /**
     * {@link AbstractRouter.setRoute}
     * @param {e.Application} application
     */
    static setRoute(application: e.Application) {
        application.route("/api")
            .all((req, res, next) => {next();})
            .get((req, res) => {res.json({value: "this is HtmlRouter"})})
    }
}