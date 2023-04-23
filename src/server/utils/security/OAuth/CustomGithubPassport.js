import passport from 'passport';
import CustomGitHubStrategy from "./CustomGitHubStrategy.js";

passport.use(new CustomGitHubStrategy());

export default passport;