import { Request, NextFunction, Response } from "express";
import HttpException from "utils/httpException";
import UserService from "./user.service";
const userService = new UserService();

export default class UserController {
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await userService.createUser({ username, password });
      res.send(user);
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message));
    }
  };

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const token = await userService.authenticateUser({ username, password });
      res.send({ token });
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message));
    }
  };
}
