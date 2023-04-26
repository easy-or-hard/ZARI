import passport from 'passport';
import {Strategy as githubStrategy} from 'passport-github';
import {Strategy as kakaoStrategy} from 'passport-kakao';
import {Strategy as naverStrategy} from 'passport-naver';
import {Strategy as appleStrategy} from 'passport-apple';
import jwt from 'jsonwebtoken';
import CustomProcess from "../../configure/CustomProcess.js";
import {TokenValidationError} from "../../errors/CustomError.js";
import CustomLogger from "../../configure/CustomLogger.js";
import AuthService from "../../../MVC/services/AuthService.js";

export default class CustomPassport {
    static #instance;
    static #authenticatable = [];
    #passport = passport;
    #jwt = jwt;
    #logger = new CustomLogger();
    #customProcess = new CustomProcess();
    #authService = new AuthService();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#passportGithubInitialize();
        this.#passportKakaoInitialize();
        this.#passportNaverInitialize();
        this.#passportAppleInitialize();

        Object.freeze(CustomPassport.#authenticatable);
        this.#logger.info(CustomPassport.authenticatable);
    }

    #callback = async (accessToken, refreshToken, profile, done) => {
        const byeol = await this.#authService.isSignUpValidAndSignUp(profile);
        if (byeol?.id) {
            profile.byeolId = byeol.id;
        }
        this.#logger.info(profile);
        return done(null, profile);
    }

    static get authenticatable() {
        return this.#authenticatable;
    }

    #passportGithubInitialize() {
        try {
            this.#passport.use(new githubStrategy({
                clientID: this.#customProcess.env.GITHUB_CLIENT_ID,
                clientSecret: this.#customProcess.env.GITHUB_CLIENT_SECRET,
                callbackURL: this.#customProcess.env.GITHUB_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('github');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    #passportKakaoInitialize() {
        try {
            this.#passport.use(new kakaoStrategy({
                clientID: this.#customProcess.env.KAKAO_CLIENT_ID,
                clientSecret: this.#customProcess.env.KAKAO_CLIENT_SECRET,
                callbackURL: this.#customProcess.env.KAKAO_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('kakao');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    #passportNaverInitialize() {
        try {
            this.#passport.use(new naverStrategy({
                clientID: this.#customProcess.env.NAVER_CLIENT_ID,
                clientSecret: this.#customProcess.env.NAVER_CLIENT_SECRET,
                callbackURL: this.#customProcess.env.NAVER_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('naver');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    #passportAppleInitialize() {
        try {
            this.#passport.use(new appleStrategy({
                clientID: this.#customProcess.env.APPLE_CLIENT_ID,
                clientSecret: this.#customProcess.env.APPLE_CLIENT_SECRET,
                callbackURL: this.#customProcess.env.APPLE_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('apple');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    /**
     * @type {Function}
     */
    initialize = this.#passport.initialize({});

    authenticateKakao = this.authenticate('kakao')
    authenticateKakaoCallback = this.authenticateCallback('kakao');

    authenticate = (strategy) => this.#passport.authenticate(strategy, {session: false});
    authenticateCallback = (strategy) =>
        this.#passport.authenticate(strategy, {
            successRedirect: '/',
            failureRedirect: '/auth/failure',
            session: false
        });

    jwtGenerator = async (req, res) => {
        const token = this.#jwt.sign({user: req.user},
            this.#customProcess.env.JWT_SECRET_KEY, {
                expiresIn: '30d',
                algorithm: 'HS256',
                issuer: 'zari-aut'
            });
        res.cookie('jwt', token, {httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30});
        return res.status(201).send('인증 성공');
    }

    jwtVerify = async (req, res, next) => {
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