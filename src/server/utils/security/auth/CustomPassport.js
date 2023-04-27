import passport from 'passport';
import {Strategy as githubStrategy} from 'passport-github';
import {Strategy as kakaoStrategy} from 'passport-kakao';
import {Strategy as naverStrategy} from 'passport-naver';
import {Strategy as appleStrategy} from 'passport-apple';
import jwt from 'jsonwebtoken';
import CustomProcess from "../../configure/CustomProcess.js";
import CustomLogger from "../../configure/CustomLogger.js";
import AuthService from "../../../MVC/services/AuthService.js";

export default class CustomPassport {
    static #instance;
    static #authenticatable = [];
    #passport;
    #jwt;
    #logger;
    #process;
    #authService;

    constructor({
                    _passport = passport,
                    _jwt = jwt,
                    _logger = new CustomLogger(),
                    _process = new CustomProcess(),
                    _authService = new AuthService()
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#passport = _passport;
        this.#jwt = _jwt;
        this.#logger = _logger;
        this.#process = _process;
        this.#authService = _authService;

        this.#passportGithubInitialize();
        this.#passportKakaoInitialize();
        this.#passportNaverInitialize();
        this.#passportAppleInitialize();

        Object.freeze(CustomPassport.#authenticatable);
        this.#logger.info(CustomPassport.#authenticatable);
    }

    #callback = async (accessToken, refreshToken, profile, done) => {
        const byeol = await this.#authService.isSignUpAllowedAndSignUp(profile);
        if (byeol?.id) {
            profile.byeolId = byeol.id;
        }
        this.#logger.info(profile);
        return done(null, profile);
    }

    #passportGithubInitialize = () => {
        try {
            this.#passport.use(new githubStrategy({
                clientID: this.#process.env.GITHUB_CLIENT_ID,
                clientSecret: this.#process.env.GITHUB_CLIENT_SECRET,
                callbackURL: this.#process.env.GITHUB_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('github');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    #passportKakaoInitialize = () => {
        try {
            this.#passport.use(new kakaoStrategy({
                clientID: this.#process.env.KAKAO_CLIENT_ID,
                clientSecret: this.#process.env.KAKAO_CLIENT_SECRET,
                callbackURL: this.#process.env.KAKAO_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('kakao');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    #passportNaverInitialize = () => {
        try {
            this.#passport.use(new naverStrategy({
                clientID: this.#process.env.NAVER_CLIENT_ID,
                clientSecret: this.#process.env.NAVER_CLIENT_SECRET,
                callbackURL: this.#process.env.NAVER_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('naver');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    #passportAppleInitialize = () => {
        try {
            this.#passport.use(new appleStrategy({
                clientID: this.#process.env.APPLE_CLIENT_ID,
                clientSecret: this.#process.env.APPLE_CLIENT_SECRET,
                callbackURL: this.#process.env.APPLE_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.#authenticatable.push('apple');
        } catch (e) {
            this.#logger.error(e);
        }
    }

    get initialize() {
        return this.#passport.initialize({});
    }

    authenticate = (strategy) => this.#passport.authenticate(strategy, {session: false});
    authenticateCallback = (strategy) =>
        this.#passport.authenticate(strategy, {
            successRedirect: '/',
            failureRedirect: '/auth/failure',
            session: false
        });
}