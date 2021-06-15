import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();

dashboardRouter.post("/getRaces", authMiddleware.auth, DashboardController.getRaces);
dashboardRouter.post("/getHorses", authMiddleware.auth, DashboardController.getHorses);

export default dashboardRouter;