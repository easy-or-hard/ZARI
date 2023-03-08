import swaggerUiExpress from 'swagger-ui-express';
import specs from "../conf/swagger";
import express from "express";

export default class SwaggerRouter {
    private static readonly swaggerRouter: SwaggerRouter = this.initialize();
    /**
     * get routes instance
     * @type {express.Router}
     */
    static router : express.Router;

    private static initialize() {
        return new SwaggerRouter();
    }

    private constructor() {
        SwaggerRouter.router = express.Router();
        SwaggerRouter.setRoute();
    }

    private static setRoute() {
        this.router.use(swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
    }

    private static get = (request: express.Request, response: express.Response) => {
        let jsonValue = {value: "this is SwaggerRouter get"};
        response.json(jsonValue);
    }
}