// Hardcoded user for demonstration purposes
import {generateToken} from "./authentication.js";
import customProcess from "../../utils/configure/custom-process.js";
import jwt from "jsonwebtoken";

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
        const {username, password} = req.body;

        if (username === user.username && password === user.password) {
            req.session.user = user;
            return res.redirect('/auth/dashboard');
        }

        res.send('Invalid username or password');
    };

    async login(req, res, next) {
        const {username, password} = req.body;
        const user = users.find((user) => user.username === username);

        if (user && user.password === password) {
            const token = generateToken(user);
            res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60});
            return res.redirect('/auth/protected');
        } else {
            res.status(401).json({message: 'Invalid username or password'});
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

    async logV2(req, res, next) {
        return res.send(`
        <form action="/auth/v2/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
    `);
    }

    async loginV2(req, res, next) {
        const {username, password} = req.body;
        const user = users.find((user) => user.username === username);

        if (user && user.password === password) {
            const token = jwt.sign({id: user.id, username}, customProcess.env.JWT_SECRET_KEY);
            res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60});
            res.redirect('/auth/v2/protected');
        } else {
            res.status(401).json({message: 'Invalid username or password'});
        }
    };

    async protectedV2(req, res, next) {
        res.json({message: 'This is a protected route', user: req.user});
    }

    async githubCallback(req, res, next) {
        const cookieJwt = req.cookies['jwt'];

        if (cookieJwt) {
            jwt.verify(cookieJwt, customProcess.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.redirect('/auth');
                }
                req.user = decoded.user;
            });
        } else {
            const token = jwt.sign({user : req.user}, customProcess.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            res.cookie('jwt', token);
        }

        res.send(`<h1>Hello, ${req.user.displayName}!</h1>`);
    };
}

const users = [
    {id: 1, username: 'admin', password: 'password'},
    {id: 2, username: 'user2', password: 'password2'}
];