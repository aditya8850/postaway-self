import friendshipRepo from "./friend.repo.js";
import { ApplicationError } from "../../error-handler/errorHandler.js";

export default class FriendController {
    constructor() {
        this.friendshipRepo = new friendshipRepo();
    }

    async toggleFriendship(req, res, next) {
        try {
            const friendId = req.params.friendId;
            const userId = req.userId;

            if (friendId == userId) {
                return res.status(400).json({ message: "You can't add yourself as a friend" });
            }

            const resp = await this.friendshipRepo.toggleFriendRepo(userId, friendId);
            res.status(200).json({ message: resp.message, data: resp.data });
        } catch (error) {
            next(new ApplicationError('Error while toggling friend request.', 500));
        }
    }

    async responseToFriendship(req, res, next) {
        try {
            const friendId = req.params.friendId;
            const { status } = req.query;
            const userId = req.userId;

            const resp = await this.friendshipRepo.responseToFriendshipRepo(userId, friendId, status);
            res.status(200).json({ message: resp.message, data: resp.data });
        } catch (error) {
            next(new ApplicationError("Error responding to friend request.", 500));
        }
    }

    async getPendingReq(req, res, next) {
        try {
            const userId = req.userId;
            const pendingRequests = await this.friendshipRepo.getPendingRepo(userId);
            res.status(200).json({ data: pendingRequests });
        } catch (error) {
            next(new ApplicationError('Error fetching pending requests.', 500));
        }
    }

    async getUserFriends(req, res, next) {
        try {
            const userId = req.params.userId;
            const friends = await this.friendshipRepo.getUserFriendsRepo(userId);
            res.status(200).json({ data: friends });
        } catch (error) {
            next(new ApplicationError("Error finding friends.", 500));
        }
    }
}