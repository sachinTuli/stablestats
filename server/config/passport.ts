import { Strategy, ExtractJwt } from "passport-jwt";
import UserModel from "../models/user";

module.exports = function (passport:any) {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    passport.use("jwt", new Strategy(opts, function(jwt_payload, done) {
        UserModel.findOne({email: jwt_payload.email}, function(err:any, user:any) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));  
}