import { AuthenticationError } from "../errors/AuthenticationError"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import {
	ILoginInputDTO,
	ILoginOutputDTO,
	ISignupInputDTO,
	ISignupOutputDTO,
	User,
} from "../model/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { RGBGenerator } from "../services/RGBGenarator"
import { CheckingUser } from "../services/CheckingUser"
import { PrismaClient } from "@prisma/client"

export class UsersBusiness {
	constructor(
		private rgbGenerator: RGBGenerator,
		private idGenerator: IdGenerator,
		private hashManager: HashManager,
		private authenticator: Authenticator,
		private checkingUser: CheckingUser
	) {}

	public signup = async (input: ISignupInputDTO): Promise<ISignupOutputDTO> => {
		const { name, email, password } = input

		this.checkingUser.email(email)
		this.checkingUser.password(password)

		// const isEmailAlreadyExists = await this.usersDataBase.findByEmail(email)

		// if (isEmailAlreadyExists) {
		// 	throw new ConflictError("Email já cadastrado")
		// }

		const id = this.idGenerator.generate()
		const hashedPassword = await this.hashManager.hash(password)
		const rgb: any = this.rgbGenerator.generateRGB()
		const imgPerfil = null
		const friends = null
		const postUser = null

		// const user = new User(id, name, email, hashedPassword, rgb, imgPerfil, friends, postUser)
        const prismaClient = new PrismaClient()


		await prismaClient.userPublic.create({
			data: {
				email,
				name,
				password,
				rgb,
			},
		})

		// await this.usersDataBase.createUser(user)

		// const payload: ITokenPayload = {
		// 	id: user.getId(),
		// }
		// const token = this.authenticator.generateToken(payload)

		const token = "tudo certo"

		const response: ISignupOutputDTO = {
			message: "Cadastro realizado com sucesso",
			token,
		}

		return response
	}

	public login = async (input: ILoginInputDTO): Promise<ILoginOutputDTO> => {
		const { email, password } = input

		this.checkingUser.email(email)
		this.checkingUser.password(password)

		// const userDB = await this.usersDataBase.findByEmailLogin(email)

		// if (!userDB) {
		// 	throw new NotFoundError("Email não cadastrado")
		// }
		// const user = new User(
		// 	userDB.id,
		// 	userDB.name,
		// 	userDB.email,
		// 	userDB.password,
		// 	userDB.rgb,
		// 	userDB.imgPerfil,
		// 	userDB.friends,
		// 	userDB.postUser
		// )
		// const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())
		// if (!isPasswordCorrect) {
		// 	throw new AuthenticationError("Password incorreto")
		// }
		// const payload: ITokenPayload = {
		// 	id: user.getId(),
		// }
		// const token = this.authenticator.generateToken(payload)

		const token = "tudo certo"

		const response: ILoginOutputDTO = {
			message: "Login realizado com sucesso",
			token,
		}
		return response
	}
}
