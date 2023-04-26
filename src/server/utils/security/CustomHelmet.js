import helmet from "helmet";

export default class CustomHelmet {
    static #instance;
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    #options = {
        contentSecurityPolicy: '*',
    }
    helmet() {
        return helmet(this.#options);
    }
}