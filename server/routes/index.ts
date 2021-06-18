import { Router } from 'express';
import paymentRouter from './payment';
import subscriptionRouter from './subscription';
import { AUTH_ROUTE, USER_ROUTE, DASHBOARD_ROUTE } from '../constants/Routes';
import authMiddleware from '../middleware/auth.middleware';
import authRouter from './auth';
import dashboardRouter from './dashboard';
import userRouter from './user';

const router = Router();

router.use(AUTH_ROUTE.BASE, authRouter);
router.use(USER_ROUTE.BASE, authMiddleware.auth, userRouter)
router.use(DASHBOARD_ROUTE.BASE, authMiddleware.auth, dashboardRouter);
router.use(SUBSCRIPTION_ROUTE.BASE, subscriptionRouter);
router.use(PAYMENT_ROUTE.BASE, authMiddleware.auth, paymentRouter);

export default router;                                                                              