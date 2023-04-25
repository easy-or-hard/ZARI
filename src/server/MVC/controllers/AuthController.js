import customProcess from "../../utils/configure/custom-process.js";
import jwt from "jsonwebtoken";

export default class AuthController {
    static #instance;


    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async githubCallback(req, res, next) {
        const cookieJwt = req.cookies['jwt'];

        if (cookieJwt) {
            jwt.verify(cookieJwt, customProcess.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.redirect('/auth');
                }
                req.user = decoded.user;
            });
        } else {
            const token = jwt.sign({user : req.user}, customProcess.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            res.cookie('jwt', token);
        }

        res.send(`<h1>Hello, ${req.user.displayName}!</h1>`);
    };
}