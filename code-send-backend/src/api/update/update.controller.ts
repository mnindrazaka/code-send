import { Request, Response, NextFunction } from "express";
import UpdateService from "./update.service";
import HttpException from "utils/httpException";
const updateService = new UpdateService();

export default class UpdateController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const updates = await updateService.getAllUpdates(projectId);
      res.send(updates);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  latest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const update = await updateService.getLatestUpdate(projectId);
      res.send(update);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const update = await updateService.createUpdate(projectId, req.body);
      res.send(update);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { updateId } = req.params;
      const update = await updateService.editUpdate(updateId, req.body);
      res.send(update);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  uploadBundle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, updateId } = req.params;
      const bundleBuffer = req.file.buffer;
      const update = await updateService.uploadBundle(
        projectId,
        updateId,
        bundleBuffer
      );
      res.send(update);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  check = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const { updateId, latitude, longitude } = req.body;
      const update = await updateService.checkUpdate(
        projectId,
        updateId,
        latitude,
        longitude
      );
      res.send(update);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}
