import GitHubStrategy from "passport-github";


export default class CustomGitHubStrategy extends GitHubStrategy {
    constructor() {
        super();
    }
}
