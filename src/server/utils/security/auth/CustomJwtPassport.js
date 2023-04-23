import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import customProcess from "../../configure/custom-process.js";

const users = [
    { id: 1, username: 'admin', password: 'password' },
    { id: 2, username: 'user2', password: 'password2' }
];

export default class CustomJwtPassport {
    static #instance;
    #passport = passport;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#passportInitialize();
    }

    #passportInitialize() {
        this.#passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies && req.cookies.token]),
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customProcess.env.JWT_SECRET_KEY
        }, async (jwtPayload, done) => {
            try {
                const user = users.find((user) => user.id === jwtPayload.id);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }));
    }

    initialize = () => {
        return this.#passport.initialize({});
    }

    authenticate = () => {
        return this.#passport.authenticate('jwt', { session: false });
    }
}