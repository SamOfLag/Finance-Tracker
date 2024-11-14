import mongoose, {Document} from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string
}

export interface IAuthRequest extends Request {
    userId?: string
}

export interface IFinance extends Document {
    date: Date,
    amount: number,
    category: string,
    description: string,
    user: mongoose.Schema.Types.ObjectId
}