import GitHubStrategy from "passport-github";
import customProcess from "../../configure/custom-process.js";

export default class CustomGitHubStrategy extends GitHubStrategy {
    constructor() {
        super({
                clientID: customProcess.env.GITHUB_CLIENT_ID,
                clientSecret: customProcess.env.GITHUB_CLIENT_SECRET,
                callbackURL: customProcess.env.GITHUB_CALLBACK_URL
            },
            async (accessToken, refreshToken, profile, done) => {
                // Here, you can handle the user profile and store it in your database if needed
                // For now, let's just return the profile
                return done(null, profile);
            });
    }
}
