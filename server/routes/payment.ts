import { Router } from "express";
import { PAYMENT_ROUTE } from "../constants/Routes";
import PaymentController from '../controllers/PaymentController';

const paymentRouter = Router();

paymentRouter.post(PAYMENT_ROUTE.ADD_NEW_CUSTOMER, PaymentController.newCustomer);
paymentRouter.post(PAYMENT_ROUTE.ADD_NEW_CARD, PaymentController.addNewCard);
paymentRouter.post(PAYMENT_ROUTE.PAYMENT, PaymentController.payment);

export default paymentRouter;
