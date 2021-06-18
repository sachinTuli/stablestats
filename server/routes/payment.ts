import { Router } from "express";
import PaymentController from '../controllers/PaymentController';

const payment = Router();

payment.post("/newCustomer", PaymentController.newCustomer);

payment.post("/addNewCard", PaymentController.addNewCard);

payment.post("/payment", PaymentController.payment);
export default payment;