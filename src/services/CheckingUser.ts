import { ParamsError } from "../errors/ParamsError"

export class CheckingUser {
	public email = (email: string): void => {
		if (typeof email !== "string") {
			throw new ParamsError("Parâmetro 'email' inválido")
		}

		if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
			throw new ParamsError("Parâmetro 'email' inválido")
		}
	}
	public password = (password: string): void => {
		if (typeof password !== "string") {
			throw new ParamsError("Parâmetro 'password' inválido")
		}
		if (password.length < 6) {
			throw new ParamsError("Parâmetro 'password' inválido: mínimo de 6 caracteres")
		}
	}
}
