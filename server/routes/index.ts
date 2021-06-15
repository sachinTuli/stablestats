import { Router } from 'express';
import authRouter from './auth';
import dashboardRouter from './dashboard';

const router = Router();

router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);

export default router;