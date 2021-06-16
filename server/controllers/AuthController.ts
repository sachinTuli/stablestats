import { HTTP_STATUS } from './../constants/ErrorStatus';
import express from 'express';
import { Message } from '../constants/Message';
import authService from '../services/AuthService';
import { BaseController } from './BaseController';

class AuthController extends BaseController {

    constructor() {
        super();
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public async register(req: express.Request, res: express.Response) {
        try {
            await authService.register(req)
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.USER_REGISTERED))
        } catch(err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns user
     */
    public async login(req: express.Request, res: express.Response) {
        try {
            const user = await authService.login(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.LOGIN_SUCCESSFULL, user))
        } catch(err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
        }
    }
}

export default new AuthController()