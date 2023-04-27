import ByeolModel from "../models/ByeolModel.js";

export default class AuthService {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async isSignUpAllowedAndSignUp(profile) {
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
}