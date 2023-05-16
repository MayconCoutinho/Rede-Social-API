import express, { NextFunction, Request, Response } from "express"
import pingRouter from "./routes/ping.routes"
import { ParamsError } from "./errors/ParamsError"
import { postsRouter } from "./routes/posts.routes"
import { usersRouter } from "./routes/users.routes"

const app = express()

app.use(pingRouter)
app.use(postsRouter)
app.use(usersRouter)

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
