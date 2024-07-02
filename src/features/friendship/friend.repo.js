import { ApplicationError } from "../../error-handler/errorHandler.js";
import mongoose from "mongoose";
import { FriendshipSchema } from "./friend.schema.js";
const FriendshipModel = mongoose.model("Friendship", FriendshipSchema)
export default class FriendshipRepo {

    async toggleFriendRepo(userId, friendId) {
        try {
            // Check if a friendship document exists between the two users
            // if it does we need to remove it
            const existingFriendship = await FriendshipModel.findOneAndDelete({
                $or: [
                    { userId: userId, friendId: friendId, status: 'accepted' },
                    { userId: friendId, friendId: userId, status: 'accepted' }
                ]
            })
            if (existingFriendship) {
                return { message: "Friendship removed" }
            } else {
                // Check if a pending friend request already exists between the users
                const pendingFriendship = await FriendshipModel.findOne({
                    $or: [
                        { userId: userId, friendId: friendId, status: 'pending' },
                        { userId: friendId, friendId: userId, status: 'pending' }
                    ]
                })
                if (pendingFriendship) {
                    return { message: "Friendship req already exists" }
                }
            }
            // Friendship doesn't exist, create it, and default status will be pending
            const newFriendship = new FriendshipModel({
                userId: userId,
                friendId: friendId,
                status: 'pending'
            })
            await newFriendship.save()
            return { message: "Friendship created", data: newFriendship }
        } catch (error) {
            throw new ApplicationError(error.message, 400)
        }
    }

    async getPendingRepo(userId) {
        try {
            const pendingFriendships = await FriendshipModel.find({ userId: userId, status: 'pending' })
                .populate({ path: 'userId', select: '-password -tokens ' }).populate({ path: 'friendId', select: '-password -tokens ' })
            return pendingFriendships
        } catch (error) {
            throw new ApplicationError(error.message, 400)
        }

    }

    async responseToFriendshipRepo(userId, friendId, status) {
        try {
            let statusToUpdate;
            if (status === 'accept') {
                statusToUpdate = 'accepted'
                // Find the friendship document where the userId is the friend and friendId is the user
                const friendship = await FriendshipModel.findOneAndUpdate(
                    { userId, friendId, status: 'pending' },
                    { $set: { status: statusToUpdate } },
                    { new: true }
                )
                if (friendship) {
                    return { message: "Friend req accepted", data: friendship }
                } else {
                    return { message: "Friend req not found" }
                }
            } else if (status == 'reject') {
                statusToUpdate = 'rejected'
                const friendship = await FriendshipModel.findOneAndDelete(
                    { userId: friendId, friendId: userId, status: 'pending' },
                    { $set: { status: statusToUpdate } },
                    { new: true }
                );
                if (friendship) {
                    return { message: "Friend req rejected", data: friendship }
                } else {
                    return { message: "Friend req not found" }
                }
            }
        } catch (error) {
            throw new ApplicationError("Err at db level while responding to friendship")
        }
    }

    async getUserFriendsRepo(userId) {
        try {
            const userFriends = await FriendshipModel.find({ userId: userId, status: 'accepted' })
                .populate({ path: 'userId', select: '-password -tokens ' }).populate({
                    path
                        : 'friendId', select: '-password -tokens '
                })
            return userFriends
        } catch (error) {
            throw new ApplicationError(error.message, 400)
        }
    }
}