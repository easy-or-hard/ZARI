import morgan from 'morgan';

export default new class CustomMorgan {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    morgan() {
        let format = this.#format;
        let options = this.#options;
        return morgan(format, options);
    }

    #format = ':method :url :status :res[content-length] - :response-time ms';
    #options = {
            stream: {
                write: (message) => {
                    console.log(message);
                }
            }
    }
}