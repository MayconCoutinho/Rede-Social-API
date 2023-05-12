import { Router } from "express"
import { UserController } from "../controller/userController"
import { Validation } from "../model/interfaces/controller"

export const usersRouter = Router()

const userController = new UserController()

// usersRouter.get("/perfil", usersController.getPerfilUser)
usersRouter.post("/register", userController.handle)
// usersRouter.post("/login", usersController.login)

export default usersRouter
