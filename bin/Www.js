import App from "../App.js";
import CustomProcess from "../src/server/utils/configure/CustomProcess.js";
import CustomSequelize from '../src/server/utils/configure/CustomSequelize.js';
import CustomLogger from '../src/server/utils/configure/CustomLogger.js';

class Www {
    /**
     * @type {App}
     */
    app = new App();

    /**
     * @type {CustomLogger}
     */
    #logger = new CustomLogger();

    /**
     * @type {CustomProcess}
     */
    #customProcess = new CustomProcess();

    constructor(
        app = new App(),
        logger = new CustomLogger(),
        customProcess = new CustomProcess()
    ) {
        this.app = app;
        this.#logger = logger;
        this.#customProcess = customProcess;
    }

    start = () => {
        new CustomSequelize()
            .sync()
            .then(this.#listen)
            .catch(this.#errorHandler);
    }

    #listen = () => {
        this.#logger.info('Database is ready');
        this.app.listen(this.#customProcess.env.PORT, () => {
            this.#logger.info(`Server is ready at ${this.#customProcess.env.PORT}`);
        });
    }

    #errorHandler = (error) => {
        this.#logger.error(error);
    }
}

new Www().start();