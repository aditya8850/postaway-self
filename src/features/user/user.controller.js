import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepo from './user.repo.js';
import { ApplicationError } from '../../error-handler/errorHandler.js';
export default class UserController {
    constructor() {
        this.userRepo = new UserRepo()
    }
    async signUp(req, res, next) {
        try {
            let { name, email, password, gender } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            const userToRegister = {
                name,
                email,
                password: hashedPassword,
                gender
            }
            console.log(userToRegister)
            const newUser = await this.userRepo.register(userToRegister)
            // Send a successful response
            return res.status(201).json({
                message: 'User registered successfully',
                newUser
            });
        } catch (error) {
            console.error(error);
            throw new ApplicationError("Registeration failed at controller level!")
        }
    }

    async signIn(req, res, next) {
        try {
            //find email first in db
            const user = await this.userRepo.findByEmail(req.body.email)
            if (!user) {
                throw new ApplicationError("Couldnt find the user, register first", 404)
            }
            //compare password
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordValid) {
                throw new ApplicationError("Invalid password", 401)
            }

            //generate token
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn
                    : '1d'
            })
            res.cookie('token',token, {
                httpOnly: true, // This prevents client-side JavaScript from reading the cookie
                maxAge: 24 * 60 * 60 * 1000 // 1 day expiry in milliseconds
            })
            const userWithToken = await this.userRepo.addTknToSchema(user._id, token)
           
            //send response
            return res.status(200).json({ message: "User signed in successfully", userWithToken })
        } catch (error) {
            console.error(error);
            throw new ApplicationError("Login failed at controller level!", 404)
        }
    }

    async signOut(req, res, next) {
        try {
            const user = await this.userRepo.removeTknFromSchema(req.userId,req.cookies.token)
            console.log(user);
            res.clearCookie('token'); // Clearing the 'token' cookie
            return res.status(200).json({ message: "User signed out successfully" })
        } catch (error) {
            console.error(error);
            throw new ApplicationError("Err logging out!", 404)
        }
    }

    async signOutAll(req,res,next){
        try {
            const user = await this.userRepo.removeAllTokens(req.userId);
            res.clearCookie('token'); 
            if (!user) {
                throw new ApplicationError('User not found', 404);
            }

            res.json({ message: 'Logged out from all devices successfully' });
        } catch (error) {
            console.error(error);
            throw new ApplicationError("Err signing all devices out!", 404)
        }
    }

}