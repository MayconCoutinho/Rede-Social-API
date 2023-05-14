import { Router } from "express"
import { PingBusiness } from "../business/ping"
import { PingController } from "../controller/ping"

export const pingRouter = Router()

const pingController = new PingController(new PingBusiness())

pingRouter.get("/ping/", pingController.ping)

export default pingRouter
