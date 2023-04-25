import passport from 'passport';
import {Strategy as githubStrategy} from 'passport-github';
import jwt from 'jsonwebtoken';
import CustomProcess from "../../configure/CustomProcess.js";
import {TokenValidationError} from "../../errors/ConflictError.js";
import CustomLogger from "../../configure/CustomLogger.js";

export default class CustomGithubPassport {
    static #instance;
    #passport = passport;
    #jwt = jwt;
    #logger = new CustomLogger();
    #customProcess = new CustomProcess();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        try {
            this.#passportInitialize();
        } catch (error) {
            this.#logger.error(error);
        }
    }

    #passportInitialize() {
        this.#passport.use(new githubStrategy({
                clientID: this.#customProcess.env.GITHUB_CLIENT_ID,
                clientSecret: this.#customProcess.env.GITHUB_CLIENT_SECRET,
                callbackURL: this.#customProcess.env.GITHUB_CALLBACK_URL
            }, (accessToken, refreshToken, profile, done) => {
                // Here, you can handle the user profile and store it in your database if needed
                // For now, let's just return the profile
                this.#logger.log(profile);
                return done(null, profile);
            }
        ));
    }

    initialize() {
        return this.#passport.initialize({});
    }

    authenticate() {
        return this.#passport.authenticate('github', {
            session: false
        })
    }

    authenticateMiddleware() {
        return this.#passport.authenticate('github', {
            failureRedirect: '/auth/failure',
            session: false
        });
    };

    jwtGenerator = async(req, res, next) => {
        const token = this.#jwt.sign({user: req.user},
            this.#customProcess.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
            algorithm: 'HS256',
            issuer: 'zari-aut'
        });
        res.cookie('jwt', token);
        return res.status(201).send('인증 성공');
    }

    jwtVerify = async(req, res, next) => {
        const cookieJwt = req.cookies['jwt'];

        if (!cookieJwt) {
            return next(new TokenValidationError('로그인 하세요.'));
        }

        this.#jwt.verify(
            cookieJwt,
            this.#customProcess.env.JWT_SECRET_KEY,
            async (err, decoded) => this.#jwtVerifyCallback(err, decoded, req, res, next)
        );
    };

    async #jwtVerifyCallback(err, decoded, req, res, next) {
        if (err) {
            res.clearCookie('jwt');
            return next(new TokenValidationError());
        } else {
            req.user = decoded.user;
            return next();
        }
    }
}