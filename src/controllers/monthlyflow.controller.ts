import { Request, Response, NextFunction } from 'express';
import { IAuthRequest } from '../types/interfaces';
import Income from '../models/Income';
import Expense from '../models/Expense';

export const getMonthlyFlow = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    const incomeData = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: { month: { $month: "$date" }, year: { $year: "$date" } }, total: { $sum: "$amount" } } },
    ]);

    const expenseData = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: { month: { $month: "$date" }, year: { $year: "$date" } }, total: { $sum: "$amount" } } },
    ]);

    const combinedData = incomeData.map((income) => {
      const monthYear = `${income._id.month}-${income._id.year}`;
      const expense = expenseData.find((exp) => `${exp._id.month}-${exp._id.year}` === monthYear)?.total || 0;

      return {
        monthYear,
        income: income.total,
        expenses: expense,
      };
    });

    res.status(200).json({ message: 'Monthly flow data fetched successfully', data: combinedData, error: false });
  } catch (error) {
    next(error);
  }
};
