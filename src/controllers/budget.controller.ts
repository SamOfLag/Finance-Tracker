import express, {NextFunction, Request, Response} from 'express'
import Budget from '../models/Budget'
import ErrorResponse from '../utils/errorResponse'
import { IAuthRequest } from '../types/interfaces'
import Expense from '../models/Expense'
import mongoose from 'mongoose'

export const setBudget = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const {category, amount, month, year} = req.body
        const newBudget = new Budget({userId, category, amount, month, year})
        await newBudget.save()
        res.status(201).json({message: 'New budget created successfully!', data: newBudget, error: false})
    } catch (error) {
        next (error)
    }
}

export const updateBudget = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const budgetId = req.params.id
        const {amount} = req.body
        const updatedBudget = await Budget.findByIdAndUpdate(
            {budgetId}, 
            {amount}, 
            {new: true}
        )

        if (!updatedBudget) {
            return next (new ErrorResponse('Budget not found', 500))
        }
        res.status(200).json({message: 'Budget updated!', data: updateBudget, error: false})
    } catch (error) {
        next (error)
    }
}

export const getBudgets = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    // Optional query parameters for filtering
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999); // End of the current month

    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : firstDayOfMonth;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : lastDayOfMonth;

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    

    // Fetch budgets within the date range and aggregate expenses
    const budgets = await Budget.aggregate([
      { $match: { userId, startDate: { $lte: endDate }, endDate: { $gte: startDate } } },
        {
          $lookup: {
            from: 'expenses',
            let: { category: '$category', userId: '$userId', startDate: startDate, endDate: endDate },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', '$$userId'] },
                      { $eq: ['$category', '$$category'] },
                      { $gte: ['$createdAt', '$$startDate'] },
                      { $lte: ['$createdAt', '$$endDate'] }, 
                    ],
                  },
                },
              },
              { $group: { _id: null, totalSpent: { $sum: '$amount' } } },
            ],
            as: 'expenses',
          },
        },
      {
        $addFields: {
          spentAmount: { $ifNull: [{ $arrayElemAt: ['$expenses.totalSpent', 0] }, 0] },
          remainingAmount: { $subtract: ['$amount', { $ifNull: [{ $arrayElemAt: ['$expenses.totalSpent', 0] }, 0] }] },
        },
      },
      { $project: { expenses: 0 } },
    ]);

    res.status(200).json({ message: 'Budgets fetched successfully', data: budgets, error: false });
  } catch (error) {
    next(error);
  }
};
