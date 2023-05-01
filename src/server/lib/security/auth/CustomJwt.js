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
        const jwtToken = jwt.sign({user},
            this.#customProcess.env.JWT_SECRET_KEY, {
                expiresIn: this.#customProcess.env.JWT_EXPIRES_IN,
                issuer: this.#customProcess.env.JWT_ISSUER
            });
        this.#logger.info('JWT 토큰 생성 성공', jwtToken);
        return jwtToken;
    }

    verify = async jwtToken =>
        new Promise((resolve, reject) => {
            try {
                const decoded = jwt.verify(jwtToken, this.#customProcess.env.JWT_SECRET_KEY);
                this.#logger.info('JWT 토큰 인증 성공', decoded);
                return resolve(decoded);
            } catch (err) {
                this.#logger.error('JWT 토큰 인증 실패', err);
                return reject(err);
            }
        });

    verifyAndGetPayload = jwtToken =>
        new Promise((resolve, reject) => {
            try {
                const decoded = jwt.verify(jwtToken, this.#customProcess.env.JWT_SECRET_KEY);
                this.#logger.info('JWT 토큰 인증 성공', decoded);
                return resolve(decoded.user);
            } catch (err) {
                this.#logger.error('JWT 토큰 인증 실패', err);
                return reject(err);
            }
        });

    refresh = async jwtToken => {
        this.#logger.info('JWT 토큰 갱신');
        const user = await this.verifyAndGetPayload(jwtToken, this.#customProcess.env.JWT_SECRET_KEY);
        return this.sign(user);
    }
}