import mongoose, {Schema, model} from "mongoose";
import { IAchievement } from "../types/interfaces";

const achievementSchema = new Schema<IAchievement> (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        type: {
            type: String,
            required: true,
            unique: true
        },

        description: {
            type: String,
            required: true
        },

        dateAwarded: {
            type: Date,
            default: Date.now
        },

        criteriaMet: {
            type: Boolean,
            default: false
        }
    }
)

const Achievement = mongoose.model<IAchievement>('Achievement', achievementSchema)
export default Achievement;