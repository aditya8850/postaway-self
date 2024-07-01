import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";
import { CommentSchema } from "../comment/comment.schema.js";
import { PostSchema } from "../post/post.schema.js";
import { ApplicationError } from "../../error-handler/errorHandler.js";
const LikeModel = mongoose.model('Like', LikeSchema)
const PostModel = mongoose.model('Post', PostSchema)
const CommentModel = mongoose.model('Comment', CommentSchema)
export default class LikeRepo {
    async getLike(userId, id, type) {

    }

    async toggleLike(userId, id, type) {
        try {
            const existingLike = await LikeModel.findOne({ userId, likeable: id, onModel: type })
            if (existingLike) {
                await LikeModel.findByIdAndDelete(existingLike._id)
                if (type === 'Post') {
                    await PostModel.findByIdAndUpdate(id, { $pull: { postLikes: existingLike._id } });
                } else if (type === 'Comment') {
                    await CommentModel.findByIdAndUpdate(id, { $pull: { commentLikes: existingLike._id } });
                }

                return { message: 'Like removed' };
            } else {
                const likeInstance = new LikeModel({
                    userId,
                    likeable: id,
                    onModel: type
                });

                await likeInstance.save();

                if (type === 'Post') {
                    await PostModel.findByIdAndUpdate(id, { $push: { postLikes: likeInstance._id } });
                } else if (type === 'Comment') {
                    await CommentModel.findByIdAndUpdate(id, { $push: { commentLikes: likeInstance._id } });
                }

                return likeInstance;
            }
        } catch (error) {
            throw new ApplicationError("Err toggling like", 404);

        }
    }
}