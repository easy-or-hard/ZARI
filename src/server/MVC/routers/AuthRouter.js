import express from "express";
import AuthController from "../controllers/AuthController.js";
import jwt from "jsonwebtoken";
import CustomJwtPassport from "../../utils/security/auth/CustomJwtPassport.js";
import CustomGithubPassport from "../../utils/security/auth/CustomGithubPassport.js";

export default class AuthRouter {
    static #instance;
    router= express.Router();
    #controller = new AuthController();
    #customJwtPassport = new CustomJwtPassport();
    #customGithubPassport = new CustomGithubPassport();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#routeInitialize();
    }

    #routeInitialize() {
        this.router.get('/sign-in', this.#controller.signIn);
        this.router.post('/sign-up', this.#controller.signUp);

        this.router.get('/log', this.#controller.log);
        this.router.post('/login', this.#controller.login);

        this.router.get('/v2/log', this.#controller.logV2);
        this.router.post('/v2/login', this.#controller.loginV2);
        this.router.get('/v2/protected', this.#customJwtPassport.authenticate(), this.#controller.protectedV2);

        this.router.get('/github', this.#customGithubPassport.authenticate());
        this.router.get('/github/callback', this.#customGithubPassport.authenticate2(), this.#controller.githubCallback);

        this.router.get('/dashboard', (req, res) => {
            if (req.session.user) {
                res.send(`Welcome to the dashboard, ${req.session.user.username}!`);
            } else {
                res.send('You must be logged in to access this page.');
            }
        });

        // A protected route that requires a valid JWT token
        this.router.get('/protected', (req, res) => {
            // Get the JWT token from the Authorization header
            const token = req.cookies.token;

            // If there is no token, return an error
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            try {
                // Verify the token with the secret key
                const decoded = jwt.verify(token, 'your-secret-key');

                // If the token is valid, allow access to the protected resource
                res.json({ message: 'Welcome to the protected resource, ' + decoded.username });
            } catch (err) {
                // If the token is invalid, return an error
                res.status(401).json({ error: 'Invalid token' });
            }
        });
    }


}