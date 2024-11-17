import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.config";
import color from 'colors'
import authRouter from './routes/auth.routes'
import incomeRouter from "./routes/income.routes";
import expenseRouter from "./routes/expense.routes";
import authMiddleware from "./middlewares/auth.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import budgetRouter from "./routes/budget.routes";
import summmaryRouter from "./routes/summary.routes";

dotenv.config()
// connect db
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

// mount routes
app.use('/api/auth', authRouter)
app.use('/api/incomes', incomeRouter)
app.use('/api/notes', authMiddleware, expenseRouter)
app.use('/api/budgets', budgetRouter)
app.use('/api/summary', summmaryRouter)

// errorhandler middlewares
app.use(errorHandler)

// listen on port
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(color.yellow.bold (`Server is listening on port ${PORT}`))
})