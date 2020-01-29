import { Router } from 'express'
import UpdateController from './updateController'

const updateRouter = Router()
const updateController = new UpdateController()

updateRouter.post('/', updateController.store)

export default updateRouter
