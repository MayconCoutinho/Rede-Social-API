import cors from "cors"
import express from "express"
// import { postsRouter } from './router/postsRouter'
import { usersRouter } from "./routes/user.routes"

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
	console.log(`Servidor rodando na porta ${3003}`)
})
app.use("/user", usersRouter)
// app.use("/posts", postsRouter)
