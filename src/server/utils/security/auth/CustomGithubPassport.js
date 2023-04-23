import passport from 'passport';
import { Strategy as githubStrategy } from 'passport-github';

import customProcess from "../../configure/custom-process.js";

export default class CustomGithubPassport {
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
        passport.use(new githubStrategy({
                clientID: customProcess.env.GITHUB_CLIENT_ID,
                clientSecret: customProcess.env.GITHUB_CLIENT_SECRET,
                callbackURL: customProcess.env.GITHUB_CALLBACK_URL
            },
            async (accessToken, refreshToken, profile, done) => {
                // Here, you can handle the user profile and store it in your database if needed
                // For now, let's just return the profile
                return done(null, profile);
            })
        );

        this.#passport.serializeUser((user, done) => {
            done(null, user);
        });

        this.#passport.deserializeUser((user, done) => {
            done(null, user);
        });
    }

    initialize = () => {
        return this.#passport.initialize({});
    }

    authenticate = () => {
        return this.#passport.authenticate('github');
    }

    authenticate2 = () => {
        return this.#passport.authenticate('github', { failureRedirect: '/auth' });
    }
}