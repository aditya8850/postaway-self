import "./env.js"
import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import { errorHandler } from "./src/error-handler/errorHandler.js"
import connectUsingMongoose from "./src/config/mongoose.js"
import upload from "./src/middlewares/multer.config.js"
import jwtAuth from "./src/middlewares/jwt.config.js";
import userRouter from "./src/features/user/user.route.js"

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());


//routes
app.use("/api/users",userRouter)


//application level error handler middleware
app.use(errorHandler)
//start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
    // Connect to MongoDB
    connectUsingMongoose()
});
