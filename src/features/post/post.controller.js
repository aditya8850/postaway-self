import PostRepo from "./post.repo.js";
import { ApplicationError } from '../../error-handler/errorHandler.js';


export default class PostController {
    constructor() {
        this.postRepo = new PostRepo()
    }
    async createPost(req, res, next) {
        try {
            const imageUrl = req.file
            const  {caption}  = req.body
            const userId  = req.userId
            console.log(imageUrl,userId);
            const newPost = await this.postRepo.createPost(userId,imageUrl,caption)
            return res.status(201).json({
                message: 'Post created successfully',
                newPost
            });
        } catch (err) {
            console.log(err)
            throw new ApplicationError("Err while creating a post", 404)
        }
    }
    async getOnePost(req,res,next){
        try {
            const {postId} = req.params
            const post = await this.postRepo.getOne(postId)
            if(!post){
                throw new ApplicationError("Post not found",404)
            }
            return res.status(201).json({
                message: 'Post fetched successfully',
                post
            });
        } catch (err) {
            console.log(err)
            throw new ApplicationError("Err while getting the post", 404)
        }
    }
}