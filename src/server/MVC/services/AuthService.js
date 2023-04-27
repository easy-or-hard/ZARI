import Byeol from "../models/Byeol.js";

export default class AuthService {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    isSignUpAllowedAndSignUp = async profile => {
        const isSignUpAllowed = await this.isSignUpAllowed(profile);
        if (isSignUpAllowed) {
            return await this.signUp(profile);
        }
    }

    isSignUpAllowed = async profile => {
        const condition = {where: {providerId: profile.id, provider: profile.provider}, group: ['providerId', 'provider']};
        const byeolCounts = await Byeol.count(condition);
        return byeolCounts.length === 0;
    }

    signUp = async profile => {
        const byeol = {
            byeol: profile.displayName,
            provider: profile.provider,
            providerId: profile.id
        }
        return await Byeol.create(byeol);
    }
}