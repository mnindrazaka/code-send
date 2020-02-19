import { Request, Response, NextFunction } from "express";
import HttpException from "utils/httpException";

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

export default errorHandler;
