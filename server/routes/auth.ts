import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/auth.middleware";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

authRouter.get('/discord', passport.authenticate('discord'));
//NEED TO VERIFY THIS   
// authRouter.get('/discord/callback', passport.authenticate('discord', {
//     failureRedirect: '/',session: false 
// }), function(req, res) {
//     console.log("inside callback")
//     return res.redirect("/token")
// });


authRouter.get('/discord/callback', passport.authenticate('discord', { 
    failureRedirect: '/',
    successRedirect: '/dashboard'
}));

authRouter.get("/token", passport.authenticate("jwt", { session: false }),  (req,res)=>{
    console.log("accessable function", req.user);
    return res.json("hope so worked");
})

export default authRouter;
