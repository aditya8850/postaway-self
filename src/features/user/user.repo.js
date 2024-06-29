import mongoose from "mongoose";
import userSchema from "./userSchema.js";

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
}