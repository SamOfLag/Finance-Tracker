import { Router } from "express";
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from "../controllers/expense.controller";
import authMiddleware from "../middlewares/auth.middleware";

const expenseRouter = Router()

expenseRouter.post('/', createExpense)
expenseRouter.get('/', authMiddleware, getAllExpenses)
expenseRouter.get('/:id', getExpenseById)
expenseRouter.put('/:id', updateExpense)
expenseRouter.delete('/:id', deleteExpense)

export default expenseRouter;