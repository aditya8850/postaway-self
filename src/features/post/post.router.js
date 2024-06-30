import express from "express"
import PostController from "./post.controller.js"
import upload from "../../middlewares/multer.config.js"
const postRouter = express.Router()
const postController = new PostController()
postRouter.post('/',upload.single("imageUrl"),(req,res,next)=>postController.createPost(req,res,next))
postRouter.get('/:postId',(req,res,next)=>postController.getOnePost(req,res,next))
export default postRouter