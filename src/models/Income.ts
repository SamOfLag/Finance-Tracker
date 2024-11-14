import mongoose, {Schema, model} from "mongoose";
import { IFinance } from "../types/interfaces";

const incomeShema: Schema<IFinance> = new Schema (
    {
        date: {
            type: Date,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: false
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    {
        timestamps: true
    }
)

const Income = mongoose.model<IFinance>('Income', incomeShema)
export default Income;