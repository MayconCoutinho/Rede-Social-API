import { badRequest, ok, serverError } from "../helpers"
import { Controller } from "../model/interfaces/controller"

export class UserController implements Controller {
	async handle(request: UserController.Request): Promise<any> {
		try {
			return ok(request)
		} catch (error) {
			// return serverError(error)
		}
	}
}

export namespace UserController {
	export type Request = {
		name: string
		email: string
		password: string
	}
}
