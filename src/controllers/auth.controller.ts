import express, {Request, Response} from 'express'
import User from '../models/User'
import bcrypt, { genSalt } from 'bcrypt'
import { log } from 'console'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body
        const hashedpassword = await hashpassword(password)
        const newUser = new User({username, email, password: hashedpassword})
        await newUser.save()
        res.status(201).json({message: 'User registered successfully', data: {username, email}, error: false})
    }catch (error) {
        res.status(500).json({message: "Internal server error", data: null, error: error})
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

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if (!user) {
            throw new Error ('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error ('Invalid credential')
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: '1hr'})
        console.log(token);
        res.status(200).json({message: 'Login successful', data: token, error: false})
    } catch (error) {
        console.error('Login error:', error)
        res.status(401).json({message: 'Invalid login', error: error})
    }
}