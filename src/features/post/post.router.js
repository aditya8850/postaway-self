import express from "express"
import PostController from "./post.controller.js"
import upload from "../../middlewares/multer.config.js"
const postRouter = express.Router()
const postController = new PostController()
postRouter.post('/',upload.single("imageUrl"),(req,res,next)=>postController.createPost(req,res,next))
postRouter.get('/all',(req,res,next)=>postController.getAllPosts(req,res,next))
postRouter.get('/:postId',(req,res,next)=>postController.getOnePost(req,res,next))
postRouter.delete('/:postId',(req,res,next)=>postController.deletePost(req,res,next))
postRouter.put('/:postId',upload.single("imageUrl"),(req,res,next)=>postController.updatePost(req,res,next))
export default postRouter