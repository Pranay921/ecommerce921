import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists with this Google ID
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User exists, return the user
                    return done(null, user);
                }

                // Check if user exists with the same email (from local auth)
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link Google account to existing user
                    user.googleId = profile.id;
                    user.authProvider = 'google';
                    user.profilePicture = profile.photos[0]?.value || '';
                    if (!user.name) {
                        user.name = profile.displayName;
                    }
                    await user.save();
                    return done(null, user);
                }

                // Create new user
                const newUser = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    authProvider: 'google',
                    profilePicture: profile.photos[0]?.value || ''
                });

                await newUser.save();
                done(null, newUser);
            } catch (err) {
                console.error('Google OAuth error:', err);
                done(err, null);
            }
        }
    )
);

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
