import mongoose from "mongoose";

const url = process.env.MONGOOSE_URL

const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connected to Mongoose")
    } catch (error) {
        console.log("connection to db failed", error)
    }
}
export default connectUsingMongoose