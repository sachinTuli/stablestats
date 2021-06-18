import { HTTP_STATUS } from './../constants/ErrorStatus';
import { BaseController } from "./BaseController";
import express from 'express';
import fs from 'fs';
import path from 'path';
import { Message } from '../constants/Message';
import { Package } from '../interface/Package';

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
            const json_path =  path.join(__dirname, '../json', 'packages.json');
            const packages:Package = JSON.parse(fs.readFileSync(json_path).toString());
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.ALL_RECORDS_FETCHED, packages));
        } catch(err) {
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapErrorResponse(err));
        }
    }

}

export default new SubscriptionController();