import CustomProcess from "../../configure/CustomProcess.js";
import jwt from "jsonwebtoken";
import CustomLogger from "../../configure/CustomLogger.js";

export default class CustomJwt {
    static #instance;

    /**
     *  @type {CustomProcess}
     */
    #customProcess;

    /**
     * @type {CustomLogger}
     */
    #logger;

    constructor({
                    _customProcess = new CustomProcess(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#customProcess = _customProcess;
        this.#logger = _logger;
    }

    /**
     *
     * @param user
     * @returns {string} jwtToken
     */
    sign = user => {
        const token = jwt.sign({user},
            this.#customProcess.env.JWT_SECRET_KEY, {
                expiresIn: this.#customProcess.env.JWT_EXPIRES_IN,
                issuer: this.#customProcess.env.JWT_ISSUER
            });
        this.#logger.info('JWT 생성 성공', token);
        return token;
    }

    verify = async jwtToken =>
        new Promise((resolve, reject) => {
            const callback = (err, decoded) => {
                if (err) {
                    this.#logger.error('JWT 인증 실패', err);
                    reject(new Error(err));
                } else {
                    this.#logger.info('JWT 인증 성공', decoded);
                    resolve(decoded);
                }
            };

            jwt.verify(jwtToken,
                this.#customProcess.env.JWT_SECRET_KEY,
                callback
            );
        });
}