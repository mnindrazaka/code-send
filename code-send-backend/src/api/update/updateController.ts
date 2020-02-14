import { Request, Response } from "express";
import UpdateService from "./updateService";
const updateService = new UpdateService();

export default class UpdateController {
  store = async (req: Request, res: Response) => {
    const update = await updateService.createUpdate(req.body);
    res.send(update);
  };

  uploadBundle = async (req: Request, res: Response) => {
    const id = req.params.id;
    const bundleUrl = req.file.path;
    const update = await updateService.uploadBundle(id, bundleUrl);
    res.send(update);
  };
}
