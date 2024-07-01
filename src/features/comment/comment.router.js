import express from "express"
import { CommentController } from "./comment.controller.js";
const commentRouter = express.Router()
const commentController = new CommentController()
commentRouter.post('/:postId',(req,res,next)=> commentController.addComment(req,res,next))
commentRouter.get('/:postId',(req,res,next)=>commentController.getPostComments(req,res,next))
commentRouter.delete('/:commentId',(req,res,next)=>commentController.deletePostComment(req,res,next))
commentRouter.put('/:commentId',(req,res,next)=>commentController.updatePostComment(req,res,next))
export default commentRouter