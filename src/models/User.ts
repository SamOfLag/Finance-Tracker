import mongoose, {Schema} from "mongoose";
import { IUser } from "../types/interfaces";

const userSchema: Schema<IUser> = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },
    },
    { 
        timestamps: true
    }
)

const User = mongoose.model<IUser>('User', userSchema)
export default User;