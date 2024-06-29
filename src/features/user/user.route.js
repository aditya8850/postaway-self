import express from "express"
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.config.js";
const userRouter = express.Router();
const userController = new UserController()

userRouter.post('/signup',(req,res,next)=> userController.signUp(req,res,next))
userRouter.post('/signin',(req,res,next)=> userController.signIn(req,res,next))
userRouter.post('/logout',jwtAuth,(req,res,next)=> userController.signOut(req,res,next))
userRouter.post('/logout-all-devices',jwtAuth,(req,res,next)=> userController.signOutAll(req,res,next))
export default userRouter