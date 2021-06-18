import express from 'express';
import { ERROR_MESSAGE } from '../constants/ErrorMessage';
import { HTTP_STATUS } from '../constants/ErrorStatus';
class AuthMiddleware {
    async auth(req:express.Request, res:express.Response, next:any) {
       if(req.isAuthenticated()) {
           next();
       } else {
            res.status(HTTP_STATUS.NOT_AUTHORIZED).send({ success: false, message: ERROR_MESSAGE.NOT_AUTHENTICATED });
       }
    }
}

export default new AuthMiddleware();