import { Router } from "express"
import { PingBusiness } from "../business/PingBusiness"
import { PingController } from "../controller/pingController"

export const pingRouter = Router()

const pingController = new PingController(new PingBusiness())

pingRouter.get("/ping/", pingController.ping)

export default pingRouter
