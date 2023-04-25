import App from "../App.js";
import customProcess from "../src/server/utils/configure/custom-process.js";
import CustomSequelize from '../src/server/utils/configure/CustomSequelize.js';
import customLogger from '../src/server/utils/configure/custom-logger.js';

class Www {
    app = new App();
    constructor() {
        new CustomSequelize()
            .sync()
            .then(this.#appStart)
            .catch(this.#errorHandler);
    }

    #appStart = () => {
        customLogger.info('Database is ready');
        this.app.listen(customProcess.env.PORT, () => {
            customLogger.info(`Server is ready at ${customProcess.env.PORT}`);
        });
    }

    #errorHandler = (error) => {
        customLogger.error(error);
    }
}

const www = new Www();


