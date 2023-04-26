import CustomProcess from "../../configure/CustomProcess.js";
import jwt from "jsonwebtoken";
import CustomLogger from "../../configure/CustomLogger.js";
import {TokenValidationError} from "../../errors/CustomError.js";

export default class CustomJwt {
    static #instance;
    #customProcess = new CustomProcess();
    #logger = new CustomLogger();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    /**
     *
     * @param user
     * @returns {*}
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