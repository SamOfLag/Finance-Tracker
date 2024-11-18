import express, {NextFunction, Request, Response} from 'express'
import Income from '../models/Income'
import { error } from 'console'
import { IAuthRequest } from '../types/interfaces'
import ErrorResponse from '../utils/errorResponse'
import { checkBudgetAchievements, updateStreaks } from '../utils/gamification'

// CRUD operations for income

// Create an income
export const createIncome = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const {date, amount, category, description} = req.body
        const userId = req.userId;

        // const parsedDate = new Date(date); // Convert string to Date object
        // if (isNaN(parsedDate.getTime())) {
        // return next (new ErrorResponse('Invalid date format', 500));
        // }

        const newIncome = new Income({date, amount, category, description, user: userId})
        await newIncome.save()

        await updateStreaks('userId')
        await checkBudgetAchievements('userId')

        res.status(201).json({message: 'Income created successfuly!', data: newIncome, error: false})
    } catch (error) {
        next (error)
    }
}

// Get all income
export const getAllIncome = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;

        const allIncome = await Income.find({user: userId})
        res.status(200).json({data: allIncome, error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to generate incomes', 500))
    }
}

// Get an income by id
export const getIncomeById = async (id: String, req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const income = await Income.findById(id)
        if (!income) {
            return next (new ErrorResponse('Income not found', 500))
        }
        res.status(200).json({data: income, error: false})
    } catch (error) {
        next (new ErrorResponse('Could not fetch income', 500))
    }
}

// Update an income
export const updateIncome = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {amount, category, description, date} = req.body
        const updatedIncome = await Income.findByIdAndUpdate({id, user: req.userId}, {amount, category, description, date}, {new: true})
        if (!updatedIncome) {
            return next (new ErrorResponse('Income not found', 500))
        }
        res.status(200).json({message: 'Income updated successfully', data: updatedIncome, error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to update income', 500))
    }
}

// Delete an income
export const deleteIncome = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const income = Income.findByIdAndDelete({id, user: req.userId})

        if (!income) {
            return next (new ErrorResponse('Income not found', 400))
        }
        res.status(200).json({message: 'Income deleted successfully!', error: false})
    } catch (error) {
        next (new ErrorResponse('Unable to delete income', 500))
    }
}