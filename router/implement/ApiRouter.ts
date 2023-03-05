import e from "express";
import AbstractRouter from "../abstract/AbstractRouter";

/**
 * 싱글톤 클래스 입니다.
 * {@link ApiRouter.router} 를 이용해 객체를 참조.
 */
export default class ApiRouter extends AbstractRouter {
    /**
     * {@link AbstractRouter.setRoute}
     * @param {e.Application} application
     */
    static setRoute(application: e.Application) {
        application.route("/html")
            .all((req, res, next) => {next();})
            .get((req, res) => {res.json({value: "this is ApiRouter"})})
    }
}