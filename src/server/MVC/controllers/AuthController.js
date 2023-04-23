
// Hardcoded user for demonstration purposes
import {generateToken} from "./authentication.js";

const user = {
    username: 'admin',
    password: 'password'
};

export default class AuthController {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async signIn(req, res, next) {
        if (req.session.user) {
            return res.redirect('/auth/dashboard');
        }

        return res.send(`
        <form action="/auth/sign-up" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
    `);
    };

    async signUp(req, res, next) {
        const { username, password } = req.body;

        if (username === user.username && password === user.password) {
            req.session.user = user;
            return res.redirect('/auth/dashboard');
        }

        res.send('Invalid username or password');
    };

    async login(req, res, next) {
        const { username, password } = req.body;
        const user = users.find((user) => user.username === username);

        if (user && user.password === password) {
            const token = generateToken(user);
            res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
            return res.redirect('/auth/protected');
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }

    async log(req, res, next) {
        return res.send(`
        <form action="/auth/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
    `);
    };
}

const users = [
    { id: 1, username: 'admin', password: 'password' },
    { id: 2, username: 'user2', password: 'password2' }
];