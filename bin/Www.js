import App from "../App.js";
import CustomProcess from "../src/server/utils/configure/CustomProcess.js";
import CustomSequelize from '../src/server/utils/configure/CustomSequelize.js';
import CustomLogger from '../src/server/utils/configure/CustomLogger.js';
import DummyRunner from "../src/dummy/DummyRunner.js";

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
            .sync()
            // .sync({force: true})
            // .then(new DummyRunner().insertDemoData)
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

