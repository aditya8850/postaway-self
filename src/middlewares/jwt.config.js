import jwt from "jsonwebtoken"
import { ApplicationError } from "../error-handler/errorHandler.js"

const jwtAuth = (req,res,next)=>{
    const token= req.cookies.token || req.headers.authorization
    if(!token){
        throw new ApplicationError("Token not found or has expired",400)
    }
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = payload.userId
        req.email = payload.email
        console.log("payload:",payload);
    } catch (error) {
        throw new ApplicationError("Token verification failed",400)
    }
    next()
}
export default jwtAuth;
