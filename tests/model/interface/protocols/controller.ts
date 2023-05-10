import { HttpResponse } from "../protocols"

export interface Controller<response = any> {
	handle: (request: response) => Promise<HttpResponse>
}
