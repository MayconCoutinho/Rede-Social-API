import { UsersDataBase } from "../../dataBase/user/usersDataBase"
import { PostsDataBase } from "../../dataBase/posts/postsDataBase"
import { AuthenticationError } from "../../errors/AuthenticationError"
import { ConflictError } from "../../errors/ConflictError"
import { HeadersError } from "../../errors/HeaderError"
import { NotFoundError } from "../../errors/NotFoundError"
import { ParamsError } from "../../errors/ParamsError"
import {
	ILoginInputDTO,
	ILoginOutputDTO,
	ISignupInputDTO,
	ISignupOutputDTO,
	User,
} from "../../models/User"
import { Authenticator, AuthenticatorData } from "../../services/Authenticator"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenerator"
import { RGBGenerator } from "../../services/RGBGenarator"
import { CheckingUserData } from "../../services/CheckingUserData"

export class UsersBusiness {
	constructor(
		private usersDataBase: UsersDataBase,
		private rgbGenerator: RGBGenerator,
		private idGenerator: IdGenerator,
		private hashManager: HashManager,
		private authenticator: Authenticator,
		private postsDataBase: PostsDataBase,
		private checkingUserData: CheckingUserData
	) {}

	public getPerfilUserBussines = async (idUser: string | undefined) => {
		if (!idUser) {
			throw new HeadersError()
		}

		const Allpost = await this.postsDataBase.getAllPostsDataBase()

		const postUser = Allpost?.filter((item) => {
			return item?.idUser === idUser
		})

		const response = await this.usersDataBase.getPerfilUserDataBase(idUser, postUser)

		return response
	}
	public signup = async (input: ISignupInputDTO): Promise<ISignupOutputDTO> => {
		const { name, email, password } = input

		this.checkingUserData.CheckingSignup(name, email, password)

		const hashedPassword = await this.hashManager.hash(password)

		const rgb: any = this.rgbGenerator.generateRGB()
		const imgPerfil = null
		const friends = null
		const postUser = null

		const user = new User(name, email, hashedPassword, rgb, imgPerfil, friends, postUser)

		await this.usersDataBase.createUser(user)

		const id = this.idGenerator.generate()

		const payload: AuthenticatorData = { id }

		const token = this.authenticator.generateToken(payload)

		const response: ISignupOutputDTO = {
			message: "Cadastro realizado com sucesso",
			token,
		}

		return response
	}
	public login = async (input: ILoginInputDTO): Promise<ILoginOutputDTO> => {
		const { email, password } = input

		const isToken = await this.checkingUserData.CheckingLogin(email, password)

		if (isToken) {
			const response: ILoginOutputDTO = {
				message: "Login realizado com sucesso",
				token: isToken,
			}
			return response
		}
		const Error2: ILoginOutputDTO = {
			message: "Login problema com Login",
			token: "false",
		}
		return Error2
	}
}
