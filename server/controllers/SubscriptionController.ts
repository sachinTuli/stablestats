import { HTTP_STATUS } from './../constants/ErrorStatus';
import { BaseController } from "./BaseController";
import express from 'express';
import { Message } from '../constants/Message';
import SubscriptionService from '../services/SubscriptionService';

class SubscriptionController extends BaseController {
    
    constructor() {
        super();
    }

    /**
     * 
     * @param req Request
     * @param res Response
     * @returns ApiResponse
     */
    public async packages(req: express.Request, res: express.Response) {
        try {
            let packages = SubscriptionService.getPackages(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.ALL_RECORDS_FETCHED, packages));
        } catch(err) {
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapErrorResponse(err));
        }
    }

}

export default new SubscriptionController();