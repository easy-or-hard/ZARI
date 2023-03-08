import express, {NextFunction} from "express";

/**
 * singleton pattern, early initialization pattern
 */
export default class ApiRouter {
    private static readonly apiRouter: ApiRouter = this.initialize();
    /**
     * get routes instance
     * @type {express.Router}
     */
    static router : express.Router;

    private static initialize() {
        return new ApiRouter();
    }

    private constructor() {
        ApiRouter.router = express.Router();
        ApiRouter.setRoute();
    }

    private static setRoute() {
        this.router.route("")
            .get(ApiRouter.get)
            .post(ApiRouter.post)
            .put(ApiRouter.put)
            .delete(ApiRouter.delete);
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