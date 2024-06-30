import { CommentRepo } from "./comment.repo.js"
import { ApplicationError } from "../../error-handler/errorHandler.js";

export class CommentController {
    constructor() {
        this.commentRepo = new CommentRepo()
    }
    async addComment(req, res, next) {
        try {
            const { content } = req.body
            const postId = req.params.postId
            const userId = req.userId
            const { comment, post } = await this.commentRepo.addComment(userId, postId, content)
            res.status(201).json({ message: "Comment added successfully", comment, post })
        } catch (error) {
            console.log(error)
            throw new ApplicationError("Err while adding a comment", 404)
        }
    }

    async getPostComments(req, res, next) {
        try {
            const postId = req.params.postId
            const comments = await this.commentRepo.getPostComments(postId)
            res.status(200).json({ message: "Comments  on postId fetched ", comments })
        } catch (error) {
            console.log(error)
            throw new ApplicationError("Err while adding a comment", 404)
        }
    }

    async deletePostComment(req, res, next) {
        try {
            const { commentId } = req.params
            const response = await this.commentRepo.deleteComment(commentId)
            res.status(200).json({ message: "Comment deleted successfully" })
        } catch (error) {
            console.log(error)
            throw new ApplicationError("Err while adding a comment", 404)
        }
    }

    async updatePostComment(req, res, next) {
        try {
            const { commentId } = req.params
            const { content } = req.body
            const response = await this.commentRepo.updateComment(commentId, content)
            res.status(200).json({ message: "Comment updated successfully" })
        } catch (error) {
            console.log(error)
            throw new ApplicationError("Err while adding a comment", 404)
        }
    }
}