import express, {NextFunction, Request, Response} from 'express'
import Expense from '../models/Expense'
import { error } from 'console'
import { IAuthRequest } from '../types/interfaces'
import ErrorResponse from '../utils/errorResponse'
import { checkBudgetAchievements, updateStreaks } from '../utils/gamification'


// Create an expense
export const createExpense = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const {date, amount, category, description} = req.body
        const userId = req.userId;

        const newExpense = new Expense({date, amount, category, description, user: userId})
        await newExpense.save()

        // await updateStreaks('userId')
        // await checkBudgetAchievements('userId')

        res.status(201).json({message: 'Income created successfuly!', data: newExpense, error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to create expense', 500))
    }
}

// Get all expenses
export const getAllExpenses = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;

        const allExpenses = await Expense.find({user: userId})
        res.status(200).json({data: allExpenses, error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to generate expenses', 500))
    }
}

// Get an expense by id
export const getExpenseById = async (id: String, req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const expense = await Expense.findById(id)
        if (!expense) {
            return next (new ErrorResponse('Income not found', 500))
        }
        res.status(200).json({data: expense, error: false})
    } catch (error) {
        next (new ErrorResponse('Could not fetch income', 500))
    }
}

// Update an expense
export const updateExpense = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {amount, category, description, date} = req.body
        const updatedExpense = await Expense.findByIdAndUpdate({id, user: req.userId}, {amount, category, description, date}, {new: true})
        if (!updatedExpense) {
            return next (new ErrorResponse('Income not found', 500))
        }
        res.status(200).json({message: 'Expense updated successfully', data: updatedExpense, error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to update income', 500))        
    }
}

// Delete an expense
export const deleteExpense = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const expense = Expense.findByIdAndDelete({id, user: req.userId})

        if (!expense) {
            return next (new ErrorResponse('Income not found', 400))
        }
        res.status(200).json({message: 'Expense deleted successfully!', error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to delete income', 500))
    }
}