import asyncHandler from "express-async-handler";
import passport from 'passport';
import { Strategy as githubStrategy } from 'passport-github';
import jwt from 'jsonwebtoken';
import customProcess from "../../configure/custom-process.js";

export default class CustomGithubPassport {
    static #instance;
    #passport = passport;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        try {
            this.#passportInitialize();
        } catch (error) {
            console.error(error);
        }

        // this.authenticate2 = asyncHandler(this.authenticate2.bind(this));
    }

    #passportInitialize() {
        passport.use(new githubStrategy({
                clientID: customProcess.env.GITHUB_CLIENT_ID,
                clientSecret: customProcess.env.GITHUB_CLIENT_SECRET,
                callbackURL: 'http://localhost:3000/auth/github/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                // Here, you can handle the user profile and store it in your database if needed
                // For now, let's just return the profile
                const token = jwt.sign(profile, customProcess.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                return done(null, profile);
            }
        ));

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
        return this.#passport.authenticate('github', { failureRedirect: '/auth/failure' }, (err, user, info) => {
            if (err) {
                console.error("Error during authentication:", err);
                // return res.redirect('/auth/failure');
            }
            if (!user) {
                // return res.redirect('/auth/failure');
            }
        });
    };
    
}