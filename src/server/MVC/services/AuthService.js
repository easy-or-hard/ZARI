import ByeolModel from "../models/ByeolModel.js";
import {CustomError} from "../../utils/errors/CustomError.js";
import {Strategy as githubStrategy} from "passport-github";
import passport from "passport";
import CustomProcess from "../../utils/configure/CustomProcess.js";
import CustomLogger from "../../utils/configure/CustomLogger.js";

export default class AuthService {
    static #instance;
    static #authenticatable = [];
    #customProcess = new CustomProcess();
    #logger = new CustomLogger();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async isSignUpValidAndSignUp(profile) {
        const isSignUpAllowed = await this.isSignUpAllowed(profile);
        if (isSignUpAllowed) {
            return await this.signUp(profile);
        }
    }

    async isSignUpAllowed(profile) {
        const condition = {where: {providerId: profile.id, provider: profile.provider}, group: ['providerId', 'provider']};
        const count = (await ByeolModel.count(condition)).length;
        return count === 0;
    }

    async signUp(profile) {
        const byeol = {
            byeol: profile.displayName,
            provider: profile.provider,
            providerId: profile.id
        }
        return await ByeolModel.create(byeol);
    }

    /**
     * @param byeol
     * @returns {Promise<ByeolModel>}
     */
    async signIn(byeol) {
        const [instance, created] = await ByeolModel.findOrCreate({
            where: { byeol }
        });

        if (!created) {
            throw new CustomError("Byeol already exists");
        }

        return instance;
    }

    #passportGithubInitialize() {
        try {
            passport.use(new githubStrategy({
                clientID: this.#customProcess.env.GITHUB_CLIENT_ID,
                clientSecret: this.#customProcess.env.GITHUB_CLIENT_SECRET,
                callbackURL: this.#customProcess.env.GITHUB_CALLBACK_URL
            }, this.#callback.bind(this)));
            AuthService.#authenticatable.push('github');
        } catch (e) {
            this.#logger.error(e);
        }
    }
}