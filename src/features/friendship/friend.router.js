import express from "express";
import FriendController from "./friend.controller.js";
const friendRouter = express.Router()
const friendController = new FriendController()

friendRouter.get('/toggle-friendship/:friendId', (req, res, next) => friendController.toggleFriendship(req, res, next))

friendRouter.get('/get-pending-requests',(req,res,next)=>friendController.getPendingReq(req,res,next))

friendRouter.get('/response-to-request/:friendId',(req,res,next)=>friendController.responseToFriendship(req,res,next))

friendRouter.get('/get-friends/:userId',(req,res,next)=> friendController.getUserFriends(req,res,next))

export default friendRouter