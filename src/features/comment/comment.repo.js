import mongoose from "mongoose";
import { CommentSchema } from "./comment.schema.js";
import { PostSchema } from "../post/post.schema.js";
import { ApplicationError } from "../../error-handler/errorHandler.js";

const CommentModel = mongoose.model('Comment', CommentSchema)
const PostModel = mongoose.model('Post', PostSchema)

export class CommentRepo {

    async addComment(userId, postId, content) {
        try {
            const comment = new CommentModel({ userId, postId, content })
            if (!comment) {
                throw new ApplicationError("Comment not added", 400)
            }
            const post = await PostModel.findByIdAndUpdate(
                postId,
                { $push: { postComments: comment._id } },
                { new: true }
            )
            await comment.save()
            return { comment, post }
        } catch (err) {
            throw new ApplicationError(err.message, 400)
        }
    }
    async getPostComments(postId) {
        try {
            const comments = await CommentModel.find({ postId })
            const contentOnly = comments.map(comment => comment.content)
            return contentOnly
        } catch (err) {
            throw new ApplicationError(err.message, 400)
        }
    }
    async deleteComment(commentId) {
        try {
            const comment = await CommentModel.findByIdAndDelete(commentId)
            await PostModel.updateOne(
                { postComments: commentId },
                { $pull: { postComments: commentId } }
            );
            return comment
        } catch (err) {
            throw new ApplicationError(err.message, 400)
        }
    }
    async updateComment(commentId, content) {
        try {
            const comment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true })
            return comment
        } catch (err) {
            throw new ApplicationError(err.message, 400)
        }
    }
}