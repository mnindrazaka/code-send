import { Request, Response } from "express";
import UpdateService from "./update.service";
import HttpException from "utils/httpException";
const updateService = new UpdateService();

export default class UpdateController {
  index = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const updates = await updateService.getAllUpdates(projectId);
      res.send(updates);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  latest = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const update = await updateService.getLatestUpdate(projectId);
      res.send(update);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  store = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const update = await updateService.createUpdate(projectId, req.body);
      res.send(update);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };

  uploadBundle = async (req: Request, res: Response) => {
    try {
      const { updateId } = req.params;
      const bundleBuffer = req.file.buffer;
      const update = await updateService.uploadBundle(updateId, bundleBuffer);
      res.send(update);
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  };
}
