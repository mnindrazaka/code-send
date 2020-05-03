import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpException from "utils/httpException";
import UserService from "api/user/user.service";
import { Request } from "api/type";

const userService = new UserService();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new HttpException(403, "authentication token not found");

  jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err) throw new HttpException(403, err.message);
    if (!payload) throw new HttpException(403, "no payload found");

    const { username } = payload as { username: string };
    const user = await userService.getUserByUsername(username);
    if (!user) throw new HttpException(403, "no user found");
    req.user = user;

    next();
  });
};

export default verifyToken;
