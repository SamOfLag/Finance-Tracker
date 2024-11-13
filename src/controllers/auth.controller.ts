import express, {Request, Response} from 'express'
import User from '../models/User'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body
        const newUser = 
    }
}