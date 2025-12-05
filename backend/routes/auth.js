import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
    '/signup',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // Create new user
            user = new User({
                email,
                password,
                name: name || ''
            });

            await user.save();

            // Create JWT payload
            const payload = {
                user: {
                    id: user.id,
                    email: user.email
                }
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Validate password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Create JWT payload
            const payload = {
                user: {
                    id: user.id,
                    email: user.email
                }
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST /api/auth/verify
// @desc    Verify token and get user
// @access  Private
router.post('/verify', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/auth/google/verify
// @desc    Verify Google credential and authenticate user
// @access  Public
router.post('/google/verify', async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ msg: 'No credential provided' });
        }

        // Verify the Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        // Check if user exists with this Google ID
        let user = await User.findOne({ googleId });

        if (!user) {
            // Check if user exists with the same email
            user = await User.findOne({ email });

            if (user) {
                // Link Google account to existing user
                user.googleId = googleId;
                user.authProvider = 'google';
                user.profilePicture = picture || '';
                if (!user.name) {
                    user.name = name;
                }
                await user.save();
            } else {
                // Create new user
                user = new User({
                    googleId,
                    email,
                    name,
                    authProvider: 'google',
                    profilePicture: picture || ''
                });
                await user.save();
            }
        }

        // Create JWT payload
        const jwtPayload = {
            user: {
                id: user.id,
                email: user.email
            }
        };

        // Sign token
        jwt.sign(
            jwtPayload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        profilePicture: user.profilePicture
                    }
                });
            }
        );
    } catch (err) {
        console.error('Google verification error:', err);
        res.status(500).json({ msg: 'Google authentication failed' });
    }
});

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth flow
// @access  Public
router.get('/google', (req, res, next) => {
    // Store redirect URL in session if provided
    if (req.query.redirect) {
        req.session.redirectUrl = req.query.redirect;
    }
    next();
}, (req, res, next) => {
    const passport = req.app.get('passport');
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res, next);
});

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', (req, res, next) => {
    const passport = req.app.get('passport');
    passport.authenticate('google', { session: false }, async (err, user, info) => {
        if (err) {
            console.error('Google OAuth callback error:', err);
            return res.redirect(`http://localhost:5173/login?error=authentication_failed`);
        }

        if (!user) {
            return res.redirect(`http://localhost:5173/login?error=no_user`);
        }

        try {
            // Create JWT payload
            const payload = {
                user: {
                    id: user.id,
                    email: user.email
                }
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
                (err, token) => {
                    if (err) {
                        console.error('JWT signing error:', err);
                        return res.redirect(`http://localhost:5173/login?error=token_generation_failed`);
                    }

                    // Redirect to frontend with token
                    const redirectUrl = req.session.redirectUrl || 'http://localhost:5173';
                    delete req.session.redirectUrl;
                    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
                }
            );
        } catch (err) {
            console.error('Token generation error:', err);
            res.redirect(`http://localhost:5173/login?error=server_error`);
        }
    })(req, res, next);
});

export default router;
