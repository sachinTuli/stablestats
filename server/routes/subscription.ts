import { SUBSCRIPTION_ROUTE } from './../constants/Routes';
import { Router } from "express";
import SubscriptionController from '../controllers/SubscriptionController';

const subscriptionRouter = Router();

subscriptionRouter.get(SUBSCRIPTION_ROUTE.GET_ALL, SubscriptionController.packages);

export default subscriptionRouter;
