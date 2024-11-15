import express, {NextFunction, Request, Response} from 'express'
import Budget from '../models/Budget'
import ErrorResponse from '../utils/errorResponse'
import { IAuthRequest } from '../types/interfaces'
import Expense from '../models/Expense'

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
      const userId = req.userId;
      const { month, year } = req.query;
  
      // Fetch all budgets for the user in the specified month and year
      const budgets = await Budget.find({ userId, month, year });
  
      // Calculate remaining amount for each budget category
      const budgetsWithRemaining = await Promise.all(
        budgets.map(async (budget) => {
          const totalExpenses = await Expense.aggregate([
            { $match: { userId, category: budget.category, month, year } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
          ]);
  
          const spentAmount = totalExpenses[0]?.totalAmount || 0;
          const remainingAmount = budget.amount - spentAmount;
  
          return {
            ...budget.toObject(),
            remainingAmount,
          };
        })
      );
  
      res.json(budgetsWithRemaining);
    } catch (error) {
        next (new ErrorResponse('Error fetching budgets', 500))
    }
  };