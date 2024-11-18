import { Router } from "express";
import { createIncome, getAllIncome, getIncomeById, updateIncome, deleteIncome } from "../controllers/income.controller";


const incomeRouter = Router()

incomeRouter.post('/', createIncome)
incomeRouter.get('/', getAllIncome)
incomeRouter.get('/:id', getIncomeById)
incomeRouter.put('/:id', updateIncome)
incomeRouter.delete('/:id', deleteIncome)

export default incomeRouter;