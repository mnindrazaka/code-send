import { Request, Response } from 'express'
import updateModel from './updateModel'

export default class UpdateController {
  async store(req: Request, res: Response) {
    const update = await updateModel.create(req.body)
    res.send(update)
  }
}
