import CustomLogger from "../../lib/configure/CustomLogger.js";
import {UnauthorizedError} from "../../lib/errors/CustomError.js";
import CustomProcess from "../../lib/configure/CustomProcess.js";

export default class AuthService {
    static #instance;

    #logger;
    #process;

    constructor({
                    _logger = new CustomLogger(),
                    _process = new CustomProcess(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;

        }
        this.constructor.#instance = this;

        this.#logger = _logger;
        this.#process = _process;
    }

    /**
     * JWT TOKEN 토큰을 가져온다.
     * 쿠키먼저 확인하고, 헤더를 확인한다. 브라우저 요청에 대해서도 응답해줌.
     * @param req
     * @returns {string|undefined}
     */
    extractJwtToken = req => {
        let jwtToken;

        jwtToken = req.cookies[this.#process.env.JWT_TOKEN_NAME];
        if (jwtToken) {
            return jwtToken;
        }

        jwtToken = req.headers['authorization'];
        if (jwtToken) {
            return jwtToken.split(' ')[1];
        }
        return jwtToken;
    }

    validateAuthenticatedUser = user => {
        this.#logger.info(`AuthService.validateAuthenticatedUser - user: ${user}`);

        if (!user) {
            throw new UnauthorizedError();
        }
    }
}