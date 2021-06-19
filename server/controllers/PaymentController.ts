import { BaseController } from './BaseController';
import express from 'express';
import { HTTP_STATUS } from '../constants/ErrorStatus';
import PaymentService from '../services/PaymentService';
import { Message } from '../constants/Message';

class PaymentController extends BaseController{

    constructor() {
        super();
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public async newCustomer(req: express.Request, res: express.Response) {
        try {
            const customer = await PaymentService.newCustomer(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.NEW_CUSTOMER_ADDED, customer))
          } catch (err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
          }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public async addNewCard(req: express.Request, res: express.Response) {
        try {
            const newCard = await PaymentService.addNewCard(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.ADDED_NEW_CARD, newCard))
          } catch (err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
          }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public async payment(req: express.Request, res: express.Response) {
        try {
            const user = await PaymentService.payment(req);
            return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.PAYMENT_SUCCESSFULL, user))
          } catch (err) {
            return res.status(err.status).send(super.mapErrorResponse(err));
          }
    }

}

export default new PaymentController();
