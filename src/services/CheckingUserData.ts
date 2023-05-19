import { ConflictError } from "../errors/ConflictError"
import { ParamsError } from "../errors/ParamsError"

export class CheckingUserData {
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
	}
	public CheckiIsEmailAlreadyExists = async (email: string) => {
		// Tem que checar todos os dados do banco de dados e ver se email já existe
		// const isEmailAlreadyExists = await this.usersDataBase.findByEmail(email)
		const isEmailAlreadyExists = false

		if (isEmailAlreadyExists) {
			throw new ConflictError("Email já cadastrado")
		}
	}
	public CheckingSignup = async (name: string, email: string, password: string) => {
		this.CheckiIsEmailAlreadyExists(email)
		this.CheckinName(name)
		this.CheckinEmail(email)
		this.CheckiPassword(password)
	}
	public CheckingLogin = async (email: string, password: string) => {
		this.CheckiIsEmailAlreadyExists(email)
		this.CheckinEmail(email)
		this.CheckiPassword(password)
	}
}
