import { Router } from "express"
import { UsersBusiness } from "../business/user"
import { UsersController } from "../controller/user"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { RGBGenerator } from "../services/RGBGenarator"
import { CheckingUser } from "../services/CheckingUser"
import { prismaClient } from "../dataBase/prismaClient"

export const usersRouter = Router()

const usersController = new UsersController(
	new UsersBusiness(
		new RGBGenerator(),
		new IdGenerator(),
		new HashManager(),
		new Authenticator(),
		new CheckingUser()
	)
)
usersRouter.post("/register", usersController.signup)
usersRouter.post("/login", usersController.login)
