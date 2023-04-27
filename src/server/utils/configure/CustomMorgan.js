import morgan from 'morgan';
import CustomLogger from "./CustomLogger.js";

/**
 * @description
 * 모르간을 커스텀하기 위한 클래스
 * 모르간은 클래스 기반이 아니기 때문에 상속 받아서 구현하지 않습니다.
 * 또, 모르간의 사용법은 morgan() 이기 때문에, 똑같이 사용할 수 있도록,
 * instance.morgan() 을 구현합니다.
 */
export default class CustomMorgan {
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

    get morgan() {
        const format = ':method :url :status :res[content-length] - :response-time ms';
        const options = {
            stream: {
                write: (...args) => {
                    this.#logger.info(...args);
                }
            }
        }

        this.#logger.info('모르간 설정', format, options);
        return morgan(format, options);
    }
}