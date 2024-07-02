import friendshipRepo from "./friend.repo.js";
import { ApplicationError } from "../../error-handler/errorHandler.js";

export default class FriendController {
    constructor() {
        this.friendshipRepo = new friendshipRepo()
    }

    async toggleFriendship(req, res, next) {
        try {
            const friendId = req.params.friendId
            const userId = req.userId
            if (friendId == userId) {
                throw new ApplicationError("You can't add yourself as a friend", 400)
            }
            const resp = await this.friendshipRepo.toggleFriendRepo(userId, friendId)
            if (resp) {
                res.status(200).json({ message: resp.message, data: resp.data })
            }
        } catch (error) {
            throw new ApplicationError('Err while toggling friendreq.', 404)
        }
    }

    async responseToFriendship(req, res, next) {
        const friendId = req.params.friendId
        const { status } = req.query
        const userId = req.userId
        const resp = await this.friendshipRepo.responseToFriendshipRepo(userId, friendId, status)
        if (resp) {
            res.status(200).json({ message: resp.message ,data:resp.data})
        }else{
            throw new ApplicationError("Err responding to friendreq.",404)
        }
    }

    async getPendingReq(req, res, next) {
        try {
            const userId = req.userId
            const resp = await this.friendshipRepo.getPendingRepo(userId)
            res.status(200).json({ resp })
        } catch (error) {

        }
    }

    async getUserFriends(req,res,next){
        try {
            const userId = req.params.userId
            const resp = await this.friendshipRepo.getUserFriendsRepo(userId)
            res.status(200).json({resp})
        } catch (error) {
            throw new ApplicationError("err finding friends",404)
        }
    }
}
