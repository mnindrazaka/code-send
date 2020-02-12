import { Request, Response } from "express";
import updateModel from "./updateModel";

export default class UpdateController {
  store = async (req: Request, res: Response) => {
    const update = await updateModel.create(req.body);
    res.send(update);
  };

  uploadBundle = async (req: Request, res: Response) => {
    const update = await updateModel.findByIdAndUpdate(
      req.params.id,
      {
        bundleUrl: req.file.path
      },
      { new: true }
    );
    res.send(update);
  };
}
