import { Router } from "express"
import multer from "multer"
import { PostsBusiness } from "../business/posts/postsBusiness"
import { PostsController } from "../controller/posts/postsController"
import { UsersDataBase } from "../dataBase/user/usersDataBase"
import { PostsDataBase } from "../dataBase/posts/postsDataBase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { UploadImage } from "../services/firebase"

export const postsRouter = Router()

const Multer = multer({
	storage: multer.memoryStorage(),
})

const postsController = new PostsController(
	new PostsBusiness(
		new PostsDataBase(),
		new Authenticator(),
		new IdGenerator(),
		new UsersDataBase()
	)
)
postsRouter.get("/", postsController.getPostsController)
postsRouter.post("/", Multer.single("img"), UploadImage, postsController.postPostsController)

export default postsRouter
