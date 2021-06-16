import { Router } from "express";
import AuthController from "../controllers/AuthController";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

authRouter.get('/discord', passport.authenticate('discord'));

authRouter.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    console.log("working",req.body);
    res.redirect("/dashboard");
});

authRouter.get("/token",  (req,res)=>{
    console.log("accessable function", req.user);
    console.log(req.isAuthenticated());
})

export default authRouter;
