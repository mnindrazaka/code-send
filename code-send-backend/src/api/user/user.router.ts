import { Router } from "express";
import UserController from "./user.controller";

const userRouter = Router();
const userController = new UserController();
const baseUrl = `/user`;

userRouter.post(`${baseUrl}`, userController.store);
export default userRouter;
