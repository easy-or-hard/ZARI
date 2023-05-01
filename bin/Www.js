import App from "../App.js";
import CustomProcess from "../src/server/lib/configure/CustomProcess.js";
import CustomSequelize from '../src/server/lib/configure/CustomSequelize.js';
import CustomLogger from '../src/server/lib/configure/CustomLogger.js';

class Www {
    /**
     * @type {App}
     */
    app;

    /**
     * @type {CustomLogger}
     */
    #logger;

    /**
     * @type {CustomProcess}
     */
    #customProcess;

    constructor(
        _app = new App(),
        _logger = new CustomLogger(),
        _customProcess = new CustomProcess()
    ) {
        this.app = _app;
        this.#logger = _logger;
        this.#customProcess = _customProcess;
    }

    start = () => {
        new CustomSequelize()
            .sync({force: false})
            .then(this.#listen)
            .catch(this.#errorHandler);
    }

    #listen = () => {
        this.#logger.info('Database is ready');
        this.app.listen(this.#customProcess.env.PORT, () => {
            this.#logger.info(`Server is ready at ${this.#customProcess.env.PORT}`);
        });
    }

    #errorHandler = (...args) => {
        this.#logger.error(...args);
    }
}

new Www().start();

