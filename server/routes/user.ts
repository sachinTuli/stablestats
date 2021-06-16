import { Router } from "express";
import { USER_ROUTE } from "../constants/Routes";
import UserController from "../controllers/UserController";

const userRouter = Router();

userRouter.get(USER_ROUTE.CURRUNT_USER, UserController.getCurrentUser);

export default userRouter;
