import Income from "../models/Income";
import Expense from "../models/Expense";
import { NextFunction } from "express";
import Achievement from "../models/Achievement";
import Budget from "../models/Budget";

export const updateStreaks = async (userId: string) => {
    try {
        const today = new Date().toISOString().split('T')[0]
        const hasLoggedToday = await Income.findOne({userId, createdAt: {$gte: today}}) ||
                             await Expense.findOne({userId, createdAt: {$gte: today}})

        if (hasLoggedToday) {
            let strickAchievement = await Achievement.findOne({type: 'streak'})
            if (!strickAchievement) {
                strickAchievement = new Achievement ({userId, type: 'streak', description: 'Logging entreies consistently'})
            }

            strickAchievement.criteriaMet = true;
            strickAchievement.dateAwarded = new Date();
            await strickAchievement.save();
        }
    } catch (error) {
        console.error('Error updating streaks', error)
    }
}

export const checkBudgetAchievements = async (userId: string) => {
    try {
        const currentMonth = new Date().getMonth()
        const totalExpenses = await Expense.aggregate([
            {$match: {userId}},
            {$project: {month: {$month: '$date'}, amount: 1}},
            {$match: {month: currentMonth + 1}},
            {$group: {_id: null, total: {$sum: '$amount'}}}
        ])

        const budget = await Budget.findOne({userId})

        if (budget && totalExpenses[0].total <= budget.month) {
            
        let budgetAchievement = await Achievement.findOne({userId, type: 'budget'})
        if (!budgetAchievement) {
            budgetAchievement = new Achievement ({userId, type: 'budget', description: 'Stayed under budget for a month'})
        }

        budgetAchievement.criteriaMet = true;
        budgetAchievement.dateAwarded = new Date();
        await budgetAchievement.save();
        }
        

    } catch (error) {
        console.error('Error checking budget achievements', error)
    }
}