import app from "../app.js";
import customProcess from "../src/server/utils/configure/custom-process.js";
import CustomSequelize from '../src/server/utils/configure/CustomSequelize.js';
import customLogger from '../src/server/utils/configure/custom-logger.js';

// todo: remove demo data
// import demoData from "../src/server/demo/demoData.js";

class WWW {
    constructor() {
        this.#init();
    }

    #init() {
        new CustomSequelize()
            .sync()
            // .sync({force: true})
            // .then(demoData.insertDemoData)
            .then(this.#appStart)
            .catch(this.#errorHandler);
    }

    #appStart() {
        customLogger.info('Database is ready');
        app.listen(customProcess.env.PORT, () => {
            customLogger.info(`Server is ready at ${customProcess.env.HOST}:${customProcess.env.PORT}`);
        });
    }

    #errorHandler(error) {
        customLogger.error(error);
    }
}

const www = new WWW();