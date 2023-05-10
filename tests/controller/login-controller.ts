import { Controller, HttpResponse, Validation } from "../model/interface/protocols"
import { badRequest, serverError, unauthorized, ok } from "@/presentation/helpers"

export class LoginController implements Controller {
	constructor(private readonly validation: Validation) {}

	async handle(request: LoginController.Request): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			return ok(request)
		} catch (error) {
			return serverError(error)
		}
	}
}

export namespace LoginController {
	export type Request = {
		email: string
		password: string
	}
}
