import cors from "cors";
import CustomLogger from "../configure/CustomLogger.js";

export default class CustomCors {
    static #instance;
    #logger;

    constructor({
                    logger = new CustomLogger()
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = logger;
    }

    get cors() {
        const options = {
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            credentials: true, // Access-Control-Allow-Credentials
        }

        this.#logger.info('CORS 설정', options);
        return cors(options);
    }
}