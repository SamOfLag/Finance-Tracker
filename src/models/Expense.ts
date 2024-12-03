import mongoose, {Schema, model} from "mongoose";
import { IFinance } from "../types/interfaces";


const predefExpenseCategories = [
    'Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Other'
]
const expenseSchema = new Schema<IFinance> (
    {
        amount: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            enum: predefExpenseCategories,
            default: 'Other'
        },

        description: {
            type: String,
            required: false
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    {
        timestamps: true
    }
)

const Expense = mongoose.model<IFinance>('Expense', expenseSchema)
export default Expense;