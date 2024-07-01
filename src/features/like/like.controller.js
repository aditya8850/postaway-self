import { ApplicationError } from "../../error-handler/errorHandler.js"
import LikeRepo from "./like.repo.js"
export default class LikeController {
    constructor() {
        this.likeRepo = new LikeRepo()
    }

    async toggleLike(req, res, next) {
        try {
            const userId = req.userId
            const id = req.params.id
            const { type } = req.query
            if ((type !== 'Comment' && type !== 'Post')) {
                return res.status(400).json({ message: 'Invalid type' })
            }
            const like = await this.likeRepo.toggleLike(userId, id, type)
            return res.json({ like })


        } catch (error) {
            throw new ApplicationError("Couldnt like the post/comment", 400)
        }
    }

    async getLike(req, res, next) {
        try {
            const id = req.params.id
            const like = await this.likeRepo.getLike( id)
            return res.json({ like })
        } catch (error) {
            throw new ApplicationError("Couldnt get like", 400)
        }
    }

}