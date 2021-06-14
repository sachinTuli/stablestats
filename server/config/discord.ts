import { Strategy } from 'passport-discord';
import UserModel from '../models/user';
import UserService from '../services/UserService';

var scopes = ['identify', 'email'];

module.exports = function (passport:any) {
    passport.use(new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        callbackURL: '/auth/discord/callback',
        scope: scopes
    }, function(accessToken, refreshToken, profile, done) {
        UserModel.findOne({ discordId: profile.id }, function(err:any, user:any) {
            console.log('user is'+user)
            if (err) {
                return done(err, false);
            }
            if (user) {
                console.log("inside user"+user)
                return done(null, user);
            } else {
                console.log("Create new user")
                UserService.registerNewDiscordUser(accessToken, refreshToken, profile);
                return done(null, false);
            }
        })}
    ));
}

