import { Router } from "express";
import DashboardController from '../controllers/DashboardController';
import { DASHBOARD_ROUTE } from "../constants/Routes";

const dashboardRouter = Router();

dashboardRouter.post(DASHBOARD_ROUTE.GET_RACE, DashboardController.getRaces);
// dashboardRouter.post(DASHBOARD_ROUTE.GET_HOURSE, DashboardController.getHorses);

export default dashboardRouter; 