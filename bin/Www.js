import App from "../App.js";
import CustomProcess from "../src/server/utils/configure/CustomProcess.js";
import CustomSequelize from '../src/server/utils/configure/CustomSequelize.js';
import CustomLogger from '../src/server/utils/configure/CustomLogger.js';

class Www {
    app = new App();
    #logger = new CustomLogger();
    #customProcess = new CustomProcess();

    constructor() {
        new CustomSequelize()
            .sync()
            .then(this.#appStart)
            .catch(this.#errorHandler);
    }

    #appStart = () => {
        this.#logger.info('Database is ready');
        this.app.listen(this.#customProcess.env.PORT, () => {
            this.#logger.info(`Server is ready at ${this.#customProcess.env.PORT}`);
        });
    }

    #errorHandler = (error) => {
        this.#logger.error(error);
    }
}

const www = new Www();


