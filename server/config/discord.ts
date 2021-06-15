import { Strategy } from 'passport-discord';
import UserModel from '../models/user';
import UserService from '../services/UserService';

var scopes = ['identify', 'email'];

module.exports = function (passport:any) {


    passport.serializeUser((user, done) => {
    console.log("Serialize");
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing");
    const user = await UserModel.findById(id);
    if(user) 
        done(null, user);
});




    // passport.use(new Strategy({
    //     clientID: process.env.DISCORD_CLIENT_ID as string,
    //     clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    //     callbackURL: '/auth/discord/callback',
    //     scope: scopes
    // }, function(accessToken, refreshToken, profile, done) {
    //     UserModel.findOne({ discordId: profile.id }, function(err:any, user:any) {
    //         console.log('user is'+user)
    //         if (err) {
    //             return done(err, false);
    //         }
    //         if (user) {
    //             console.log("inside user"+user)
    //             return done(null, user);
    //         } else {
    //             console.log("Create new user")
    //             UserService.registerNewDiscordUser(accessToken, refreshToken, profile)
    //             console.log("Setting done")
    //             return done(null, profile.id);
    //         }
    //     })}
    // ));







        passport.use(new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        callbackURL: '/auth/discord/callback',
        scope: scopes
    }, async (accessToken, refreshToken, profile, done) => {


          try {
        const user = await UserModel.findOne({ discordId: profile.id });
        if(user)
        {
            console.log("User exists.");
            done(null, user);
        }
        else {
            console.log("User does not exist");
            const  savedUser = await   UserService.registerNewDiscordUser(accessToken, refreshToken, profile)
                console.log("Setting done")
            done(null, savedUser);
        }
    }
    catch(err) {
        console.log(err);
        done(err, false);
    }

    }
    ));
}

