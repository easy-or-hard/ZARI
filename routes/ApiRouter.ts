import express from "express";

/**
 * singleton pattern, early initialization pattern
 */
export default class ApiRouter {
    /**
     * get routes instance
     * @type {express.Router}
     */
    static router : express.Router = this.routerInitializer();

    private constructor() {}

    private static routerInitializer() {
        let router: express.Router = express.Router();

        router.route("")
            .get(ApiRouter.get)
            .post(ApiRouter.post)
            .put(ApiRouter.put)
            .delete(ApiRouter.delete);

        return router;
    }

    /**
     * @swagger
     *  /product:
     *    get:
     *      tags:
     *      - product
     *      description: 모든 제품 조회
     *      produces:
     *      - application/json
     *      parameters:
     *        - in: query
     *          name: category
     *          required: false
     *          schema:
     *            type: integer
     *            description: 카테고리
     *      responses:
     *       200:
     *        description: 제품 조회 성공
     */
    private static get(request: express.Request, response: express.Response) {
        let jsonValue = {value: "this is ApiRouter get"};
        response.json(jsonValue);
    }

    private static post(request: express.Request, response: express.Response) {
        let jsonValue = {value: "this is ApiRouter post"};
        response.json(jsonValue);
    }

    private static put(request: express.Request, response: express.Response) {
        let jsonValue = {value: "this is ApiRouter put"};
        response.json(jsonValue);
    }

    private static delete(request: express.Request, response: express.Response) {
        let jsonValue = {value: "this is ApiRouter delete"};
        response.json(jsonValue);
    }
}