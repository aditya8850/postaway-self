import OtpRepo from "./otp.repo.js";
import bcrypt from "bcrypt"
import { ApplicationError } from "../../error-handler/errorHandler.js";
import nodemailer from "nodemailer"
export default class OtpController {
    constructor() {
        this.otpRepo = new OtpRepo()
        // Initialize the transporter once in the constructor
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'codingninjas2k16@gmail.com',
                pass: 'slwvvlczduktvhdj'
            }
        });
    }

    async sendOtp(req, res, next) {
        try {
            const { email } = req.body;
            const otp = Math.floor(100000 + Math.random() * 900000);
            console.log(`Generated OTP: ${otp} for email: ${email}`);

            const resp = await this.otpRepo.sendOtpRepo(email, otp);
            if (!resp) {
                throw new ApplicationError("Error saving OTP to database", 500);
            }

            const mailOptions = {
                from: 'codingninjas2k16@gmail.com',
                to: email,
                subject: 'OTP for login',
                text: `Your OTP is ${otp}.`
            };

            console.log(`Sending OTP email to: ${email}`);
            await this.transporter.sendMail(mailOptions);

            res.status(200).json({
                message: "OTP sent successfully",
                data: resp
            });
        } catch (error) {
            console.error('Error in sendOtp:', error);
            next(new ApplicationError(`Err sending OTP: ${error.message}`, 500));
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const { otp, email } = req.body
            const verifiedOtp = await this.otpRepo.verifyOtpRepo(otp, email)
            if (!verifiedOtp) {
                throw new ApplicationError("Invalid OTP", 401)
            }
            res.status(200).json({
                message: "OTP verified successfully",
                data: verifiedOtp
            })
        } catch (error) {
            next(new ApplicationError("Error in verifying OTP", 500))
        }
    }

    async resetPassword(req, res, next) {
        const newPassword = req.body.newPassword
        const userId = req.userId
        const resetPassword = await this.otpRepo.resetPasswordRepo(userId,newPassword)
        if (!resetPassword) {
            throw new ApplicationError("Err resetting password", 401)
        }
        res.status(200).json({
            message: "Password reset successfully",
            data: resetPassword
        })
    }
}