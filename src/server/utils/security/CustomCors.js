import cors from "cors";
export default class CustomCors {
    static #instance;
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    #options = {
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            credentials: true, // Access-Control-Allow-Credentials
    }
    cors() {
        return cors(this.#options);
    }
}