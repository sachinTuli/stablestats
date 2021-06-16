import { Strategy } from 'passport-discord';
import UserModel from '../models/user';
import UserService from '../services/UserService';

var scopes = ['identify', 'email'];

module.exports = function (passport: any) {

    passport.use(new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        callbackURL: '/auth/discord/callback',
        scope: scopes
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({ discordId: profile.id });
            if (user) {
                console.log("User exists.");
                done(null, user);
            }
            else {
                console.log("User does not exist");
                const savedUser = await UserService.registerNewDiscordUser(accessToken, refreshToken, profile)
                console.log("Setting done")
                done(null, savedUser);
            }
        }
        catch (err) {
            console.log(err);
            done(err, false);
        }

    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user)
    });

    passport.deserializeUser(function(email, done) {
        UserModel.findOne({email: email}, function(err, user) {
            done(err, user);
        })
    });

}

