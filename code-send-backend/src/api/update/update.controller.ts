import { Request, Response } from "express";
import UpdateService from "./update.service";
import HttpException from "utils/httpException";
const updateService = new UpdateService();

export default class UpdateController {
  index = async (req: Request, res: Response) => {
    try {
      const updates = await updateService.getAllUpdates();
      res.send(updates);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  latest = async (req: Request, res: Response) => {
    try {
      const update = await updateService.getLatestUpdate();
      res.send(update);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  store = async (req: Request, res: Response) => {
    try {
      const update = await updateService.createUpdate(req.body);
      res.send(update);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  uploadBundle = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const bundleBuffer = req.file.buffer;
      const update = await updateService.uploadBundle(id, bundleBuffer);
      res.send(update);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };
}
