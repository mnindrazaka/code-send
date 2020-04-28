import { Router } from "express";
import GeocodingController from "./geocoding.controller";

const geocodingRouter = Router();
const geocodingController = new GeocodingController();
const baseUrl = "/geocoding";

geocodingRouter.post(`${baseUrl}/forward`, geocodingController.forward);

export default geocodingRouter;
