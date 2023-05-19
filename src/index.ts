import express from "express"
import pingRouter from "./routes/ping.routes"
import postsRouter from "./routes/posts.routes"
import usersRouter from "./routes/users.routes"

const app = express()

app.use(express.json())

app.use(pingRouter)
app.use("/posts", postsRouter)
app.use("/users", usersRouter)

export { app }
