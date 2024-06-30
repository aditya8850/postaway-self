import express from "express"
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.config.js";
const userRouter = express.Router();
const userController = new UserController()
//authentication routes
userRouter.post('/signup',(req,res,next)=> userController.signUp(req,res,next))
userRouter.post('/signin',(req,res,next)=> userController.signIn(req,res,next))
userRouter.post('/logout',jwtAuth,(req,res,next)=> userController.signOut(req,res,next))
userRouter.post('/logout-all-devices',jwtAuth,(req,res,next)=> userController.signOutAll(req,res,next))

//user profile routes
userRouter.get('/get-details/:userId',(req,res,next)=>userController.getUser(req,res,next))
userRouter.get('/get-all-details',(req,res,next)=>userController.getAllUsers(req,res,next))
userRouter.put('/update-details/:userId',jwtAuth,(req,res,next)=>userController.updateDetails(req,res,next))
export default userRouter