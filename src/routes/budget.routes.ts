import express, {Router} from 'express'
import { getBudgets, setBudget, updateBudget } from '../controllers/budget.controller'

const budgetRouter = Router()

budgetRouter.post('/', setBudget)
budgetRouter.put('/:id', updateBudget)
budgetRouter.get('/', getBudgets)

export default budgetRouter;