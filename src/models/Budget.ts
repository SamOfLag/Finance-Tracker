import mongoose, {Schema, model} from "mongoose";
import { IBudget } from "../types/interfaces";
import { timeStamp } from "console";

const budgetSchema: Schema<IBudget> = new Schema (
    {
        userId: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'User'
        },

        category: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        year: {
            type: Number,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Budget = mongoose.model<IBudget>('Budget', budgetSchema)
export default Budget;