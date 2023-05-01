import passport from 'passport';
import {Strategy as githubStrategy} from 'passport-github';
import {Strategy as kakaoStrategy} from 'passport-kakao';
import {Strategy as naverStrategy} from 'passport-naver';
import {Strategy as appleStrategy} from 'passport-apple';
import jwt from 'jsonwebtoken';
import CustomProcess from "../../configure/CustomProcess.js";
import CustomLogger from "../../configure/CustomLogger.js";

export default class CustomPassport {
    static #instance;
    static authProviderList = [];
    #passport;
    #jwt;
    #logger;
    #process;

    constructor({
                    _passport = passport,
                    _jwt = jwt,
                    _logger = new CustomLogger(),
                    _process = new CustomProcess(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#passport = _passport;
        this.#jwt = _jwt;
        this.#logger = _logger;
        this.#process = _process;

        this.#passportGithubInitialize();
        this.#passportKakaoInitialize();
        this.#passportNaverInitialize();
        this.#passportAppleInitialize();

        Object.freeze(CustomPassport.authProviderList);
        this.#logger.info(CustomPassport.authProviderList);
    }

    get initialize() {
        return this.#passport.initialize({});
    }

    /**
     * done 이 실행되면 req.user 에 profile 이 저장됩니다.
     * @param accessToken
     * @param refreshToken
     * @param profile
     * @param done
     * @returns {Promise<*>}
     */
    #callback = async (accessToken, refreshToken, profile, done) => {
        this.#logger.info(profile);
        profile.name = profile.displayName;
        profile.providerId = profile.id;
        return done(null, profile);
    }

    authenticate = (strategy) => this.#passport.authenticate(strategy, {session: false});
    authenticateCallback = (strategy) =>
        this.#passport.authenticate(strategy, {session: false});

    #passportGithubInitialize = () => {
        try {
            this.#passport.use(new githubStrategy({
                clientID: this.#process.env.GITHUB_CLIENT_ID,
                clientSecret: this.#process.env.GITHUB_CLIENT_SECRET,
                callbackURL: this.#process.env.GITHUB_CALLBACK_URL
            }, this.#callback.bind(this)));
            CustomPassport.authProviderList.push('github');
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
            CustomPassport.authProviderList.push('kakao');
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
            CustomPassport.authProviderList.push('naver');
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
            CustomPassport.authProviderList.push('apple');
        } catch (e) {
            this.#logger.error(e);
        }
    }

}