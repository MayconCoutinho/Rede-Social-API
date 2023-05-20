import { PrismaClient } from "@prisma/client"
import { ConflictError } from "../errors/ConflictError"
import { ParamsError } from "../errors/ParamsError"
import { HashManager } from "./HashManager"
import { IUserDB } from "../models/User"
import { Authenticator } from "./Authenticator"

export class CheckingUserData {
	// constructor(hashManager: HashManager) {}

	private GetInfoUser = async (
		email: string,
		password: string
	): Promise<{ id: string } | false> => {
		await this.CheckiIsEmailAlreadyExists(email)

		const prisma = new PrismaClient()
		const decrypt = new HashManager()

		const resultData = await prisma.userPublic.findFirst({
			where: { email },
		})

		const passwordHash = resultData?.password

		if (passwordHash) {
			const decryptResult = await decrypt.compare(password, passwordHash)

			if (decryptResult) {
				return { id: resultData.id }
			}
		}
		return false
	}

	public CheckinName = async (name: string) => {
		if (typeof name !== "string") {
			throw new ParamsError("Parâmetro 'name' inválido: deve ser uma string")
		}
		if (name.length < 3) {
			throw new ParamsError("Parâmetro 'name' inválido: mínimo de 3 caracteres")
		}
	}
	public CheckinEmail = async (email: string) => {
		if (typeof email !== "string") {
			throw new ParamsError("Parâmetro 'email' inválido: deve ser uma string")
		}
		if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
			throw new ParamsError("Parâmetro 'email' inválido")
		}
	}
	public CheckiPassword = async (password: string) => {
		if (typeof password !== "string") {
			throw new ParamsError("Parâmetro 'password' inválido: deve ser uma string")
		}
		if (password.length < 6) {
			throw new ParamsError("Parâmetro 'password' inválido: mínimo de 6 caracteres")
		}
		return true
	}

	public CheckiIsEmailAlreadyExists = async (email: string) => {
		const prisma = new PrismaClient()

		const IsEmail = await prisma.userPublic.findFirst({
			where: { email },
		})
		if (IsEmail) {
			return true
		}
		return false
	}
	public CheckiIsUserAlreadyExists = async (email: string, password: string): Promise<Boolean> => {
		this.CheckinEmail(email)
		this.CheckiPassword(password)

		const prisma = new PrismaClient()

		// O banco de dado não deveria ser aqui
		const IsEmail = await prisma.userPublic.findFirst({
			where: { email },
		})
		return !!IsEmail
	}
	public CheckingSignup = async (name: string, email: string, password: string) => {
		this.CheckiIsEmailAlreadyExists(email)
		this.CheckinName(name)
		this.CheckinEmail(email)
		this.CheckiPassword(password)
	}
	public CheckingLogin = async (email: string, password: string): Promise<string | false> => {
		const IsLogin = await this.GetInfoUser(email, password)

		if (IsLogin) {
			const authenticator = new Authenticator()
			const token = authenticator.generateToken(IsLogin)
			return token
		}
		return false
	}
}
