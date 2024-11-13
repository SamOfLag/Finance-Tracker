import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.config";
import color from 'colors'

dotenv.config()
// connect db
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

// mount routes

// errorhandler middlewares

// listen on port
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(color.yellow.bold (`Server is listening on port ${PORT}`))
})