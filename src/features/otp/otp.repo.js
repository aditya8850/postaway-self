import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import userSchema from "../user/userSchema.js"
import { ApplicationError } from "../../error-handler/errorHandler.js";

const OtpModel = mongoose.model('Otp', otpSchema)
const UserModel = mongoose.model('User', userSchema)
export default class OtpRepo {

    async sendOtpRepo(email, otp) {
        try {
            console.log(`Saving OTP: ${otp} for email: ${email}`);

            const otpModel = new OtpModel({ userEmail: email, otp })
            const otpRes = await otpModel.save()
            return { message: "OTP Sent!", otpRes }
        } catch (error) {
            throw new ApplicationError(error.message, 400)
        }
    }

    async verifyOtpRepo(otp, email) {
        try {
            const otpToVerify = await OtpModel.findOne({ userEmail: email, otp })
            return otpToVerify
        } catch (error) {
            throw new ApplicationError(error.message, 400)

        }
    }

    async resetPasswordRepo(userId, newPassword) {
        try {
            const user = await UserModel.findByIdAndUpdate(userId,{$set:{password:newPassword}}).select('-password -tokens')
            const userRes = await user.save()
            return userRes
        } catch (error) {
            throw new ApplicationError(error.message, 400)
        }
    }
}