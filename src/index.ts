import express, { NextFunction, Request, Response } from "express"
import pingRouter from "./routes/ping.routes"
import { ParamsError } from "./errors/ParamsError"

const app = express()

app.use(pingRouter)

app.use((err: ParamsError, request: Request, response: Response, _next: NextFunction) => {
	if (err instanceof ParamsError) {
		return response.status(err.statusCode).json({
			status: "error",
			message: err.message,
		})
	}

	console.error(err)

	return response.status(500).json({
		status: "error",
		message: "Internal server error",
	})
})

export { app }
