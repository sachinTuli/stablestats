import { Router } from 'express';
import authRouter from './auth';
import payment from './payment';

const router = Router();

router.use("/auth", authRouter);
router.use('/stripe', payment)

export default router;