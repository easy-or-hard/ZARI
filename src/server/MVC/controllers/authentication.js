// authentication.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

// Use this example user list or your own user database
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// JWT secret key
const SECRET_KEY = 'your-secret-key';

// Passport JWT strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY
        },
        (jwtPayload, done) => {
            const user = users.find((user) => user.id === jwtPayload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    )
);

// JWT token generator
function generateToken(user) {
    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
}

export { passport, generateToken };
