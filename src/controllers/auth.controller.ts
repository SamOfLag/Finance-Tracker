import express, {NextFunction, Request, Response} from 'express'
import User from '../models/User'
import bcrypt, { genSalt } from 'bcrypt'
import { log } from 'console'
import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/errorResponse'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, email, password} = req.body
        const hashedpassword = await hashpassword(password)
        const newUser = new User({username, email, password: hashedpassword})
        await newUser.save()
        res.status(201).json({message: 'User registered successfully', data: {username, email}, error: false})
    }catch (error) {
        next (error)
    }
}

const hashpassword = async (password: string) => {
    try {
    const salt = await genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    return hashedpassword;
    } catch (error) {
        log ('Error hashing password:', error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if (!user) {
            return next (new ErrorResponse('User not found', 500))
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return next (new ErrorResponse('Invalid credential', 500))
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: '1hr'})
        console.log(token);
        res.status(200).json({message: 'Login successful', data: token, error: false})
    } catch (error) {
        console.error('Login error:', error)
        next (error)
    }
}