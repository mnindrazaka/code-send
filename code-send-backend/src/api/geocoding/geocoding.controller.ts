import { Request, Response, NextFunction } from "express";
import GeocodingService from "./geocoding.service";
import HttpException from "utils/httpException";
const geocodingService = new GeocodingService();

export default class GeocodingController {
  forward = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.body;
      const places = await geocodingService.forward(query);
      res.send(places);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}
