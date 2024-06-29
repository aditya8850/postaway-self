import mongoose from "mongoose";
import userSchema from "./userSchema.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/errorHandler.js";
const UserModel = mongoose.model("User", userSchema)

export default class UserRepo {

    async register(userToRegister) {
        try {
            //check if the user already exists
            const findUser = await UserModel.findOne({ email: userToRegister.email })
            if (findUser) {
                throw new Error("User already exists")
            }
            const newUser = new UserModel(userToRegister);
            return await newUser.save();
        } catch (error) {
            throw new Error("Db err while registering user")

        }
    }
    async findByEmail(email) {
        // now in order to store the data in a db
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with db", 500)
        }

    }
    async addTknToSchema(userId, token) {
        try {
            return await UserModel.findByIdAndUpdate(userId,
                { $push: { tokens: token } },
                { new: true }
            )
        } catch (error) {
            console.log(error);
            throw new ApplicationError("something went wrong while adding token.", 500)
        }
    }
    async removeTknFromSchema(userId, token) {
        try {
            return await UserModel.findByIdAndUpdate(
                userId,
                { $pull: { tokens: token } },
                { new: true }
            );
        } catch (error) {
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }
    async removeAllTokens(userId) {
        try {
            const user = await UserModel.findByIdAndUpdate(
                userId,
                { $set: { tokens: [] } },
                { new: true }
            );

            return user;
        } catch (error) {
            console.error(error);
            throw new ApplicationError('Something went wrong with the database', 500);
        }
    }
}