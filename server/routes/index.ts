import { Router } from 'express';
import { AUTH_ROUTE, USER_ROUTE,DASHBOARD_ROUTE } from '../constants/Routes';
import authMiddleware from '../middleware/auth.middleware';
import authRouter from './auth';
import dashboardRouter from './dashboard';
import userRouter from './user';

const router = Router();

router.use(AUTH_ROUTE.BASE, authRouter);
router.use(USER_ROUTE.BASE, authMiddleware.auth, userRouter)
router.use(DASHBOARD_ROUTE.BASE, dashboardRouter);

export default router;                                                                              