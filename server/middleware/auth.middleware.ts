import express from 'express';
import * as jwt from 'jwt-simple';

class AuthMiddleware {
    async auth(req:express.Request, res:express.Response, next:any) {
        let b_token = req.header('Authorization');
        const token = (b_token as string).split(" ")[1];
        let payload = jwt.decode(token, process.env.JWT_SECRET as string);
        req.user = payload;
        next();
    }
}

export default new AuthMiddleware();