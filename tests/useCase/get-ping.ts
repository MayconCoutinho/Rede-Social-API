import { PingModel } from "../model/types"

export interface GetPing {
	get: (message: string) => Promise<GetPing.Result>
}

export namespace GetPing {
	export type Result = PingModel[]
}
