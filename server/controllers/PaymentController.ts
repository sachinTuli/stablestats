import express from 'express';
import PaymentService from '../services/PaymentService';

class PaymentController{

    public async newCustomer(req: express.Request, res: express.Response) {
        PaymentService.newCustomer(req,res);
    }

    public async addNewCard(req: express.Request, res: express.Response) {
        PaymentService.addNewCard(req,res);
    }

    public async payment(req: express.Request, res: express.Response) {
        // PaymentService.payment(req,res);
        PaymentService.payment1(req,res);
    }

}

export default new PaymentController;