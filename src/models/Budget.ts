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

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true
        },
    },

    {timestamps: true}
)

const Budget = mongoose.model<IBudget>('Budget', budgetSchema)
export default Budget;