import passport from 'passport'
import dotenv from 'dotenv';
import { Strategy as DiscordStrategy } from "passport-discord";

dotenv.config();

passport.use( new DiscordStrategy ({
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: process.env.DISCORD_CALLBACK_URL!,
    scope: ['identify', 'email', 'guilds']
},
    (accesToken, refreshToken, profile, done) => {
        return done(null, {
            accessToken: accesToken,
            refreshToken: refreshToken,
            profile: profile
        });
}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export default passport