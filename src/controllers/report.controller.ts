import express, {Request, Response, NextFunction} from 'express'
import Income from '../models/Income'
import Expense from '../models/Expense'
import { IAuthRequest } from '../types/interfaces'
import mongoose from 'mongoose'

export const getSummary = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);

        const incomeSummary = await Income.aggregate([
            {$match: {userId}},
            {$group: {_id: '$category', total: {$sum: '$amount'}}}
        ])

        // console.log('Aggregate how far:', incomeSummary)


        const expenseSummary = await Expense.aggregate([
            {$match: {userId}},
            {$group: {_id: '$category', total: {$sum: '$amount'}}}
        ])

        const totalIncome = incomeSummary.reduce((sum, item) => sum + item.total, 0)
        const totalExpenses = expenseSummary.reduce((sum, item) => sum + item.total, 0)

        const summary = {
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses,
            incomeBreakdown: incomeSummary,
            expenseBreakdown: expenseSummary
        }

        res.status(200).json({message: 'Summary report generated successfully!', data: summary, error: false})

    } catch (error) {
        next(error)
    }
}