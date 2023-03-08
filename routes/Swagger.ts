import swaggerUiExpress from 'swagger-ui-express';
import specs from "../conf/swagger";
import express from "express";

export default class SwaggerRouter {
    /**
     * get routes instance
     * @type {express.Router}
     */
    static router : express.Router = this.routerInitializer();

    private constructor() {}

    private static routerInitializer() {
        let router: express.Router = express.Router();

        router.use(swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

        return router;
    }
}