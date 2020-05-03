import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpException from "utils/httpException";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new HttpException(403, "authentication token not found");

  jwt.verify(token, process.env.JWT_SECRET || "", function(err, payload) {
    if (err) throw new HttpException(403, err.message);
    req.body.user = payload;
    next();
  });
};

export default verifyToken;
