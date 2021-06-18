import { BaseController } from "./BaseController";
import express from 'express';


class PaymentController extends BaseController {
    
    constructor() {
        super();
    }

    /**
     * 
     * @param req Request
     * @param res Response
     * @returns ApiResponse
     */
    public async pay(req: express.Request, res: express.Response) {
        // try {
        //     const user:User = await UserService.curruntUser(req);
        //     return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.USER_FOUND, user));
        // } catch(err) {
        //     return res.status(err.status).send(super.mapErrorResponse(err));
        // }
    }

}

export default new PaymentController();