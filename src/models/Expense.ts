import mongoose, {Schema, model} from "mongoose";
import { IFinance } from "../types/interfaces";

const expenseSchema: Schema<IFinance> = new Schema (
    {
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
        }
    },

    {
        timestamps: true
    }
)

const Expense = mongoose.model<IFinance>('Expense', expenseSchema)
export default Expense;