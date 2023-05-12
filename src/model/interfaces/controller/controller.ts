import { HttpResponse } from "./http"

export interface Controller<response = any> {
	handle: (request: response) => Promise<HttpResponse>
}
