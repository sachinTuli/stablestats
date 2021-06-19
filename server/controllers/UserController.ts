import { BaseController } from "./BaseController";
import express from 'express';
import UserService from "../services/UserService";
import { HTTP_STATUS } from "../constants/ErrorStatus";
import { Message } from "../constants/Message";
import { User } from "../interface/user.interface";

class UserController extends BaseController {
    
    constructor() {
        super();
    }

    /**
     * 
     * @param req Request
     * @param res Response
     * @returns ApiResponse
     */
    public async getCurrentUser(req: express.Request, res: express.Response) {
        try {
            const user:User = await UserService.curruntUser(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.USER_FOUND, user));
        } catch(err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
        }
    }

    /**
     * 
     * @param req Request
     * @param res Response
     * @returns ApiResponse
     */

    public async setPackage(req: express.Request, res: express.Response) {
        try {
            const user:User = await UserService.setPackage(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.USER_FOUND, user));
        } catch (err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
        }
    }

}

export default new UserController();