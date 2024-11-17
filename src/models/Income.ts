import mongoose, {Schema, model} from "mongoose";
import { IFinance } from "../types/interfaces";


const predefIncomeCategories = [
    'Salary', 'Business', 'Investments', 'Other'
]

const incomeShema = new Schema<IFinance> (
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
            enum: predefIncomeCategories,
            default: 'Other'
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