import mongoose from "mongoose";
import color from 'colors'
import { log } from "console";

const connectDB = async () => {
    try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string)
    log(color.green.bold.underline(`MongoDB connected: ${connect.connection.host}`))

    } catch (error) {
        log('MongoDB connection failed')
    }
}

export default connectDB