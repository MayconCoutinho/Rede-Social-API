import express from "express"
import pingRouter from "./routes/ping.routes"
import postsRouter from "./routes/posts.routes"
import usersRouter from "./routes/users.routes"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())
app.use(pingRouter)
app.use("/posts", postsRouter)
app.use("/users", usersRouter)

export { app }
