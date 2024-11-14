import express, {Request, Response, NextFunction} from 'express'
import { IAuthRequest } from '../types/interfaces'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET as string | 'nhaea7422n24bgLEADJhchareXf83HAHharfvr'

const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({message: 'Authorization denied'})
        return
    }
    try {
    const decodedToken = jwt.verify(token, 'nhaea7422n24bgLEADJhchareXf83HAHharfvr') as {userId: string}
    req.userId = decodedToken.userId
    next()

    } catch (error) {
        console.error('Error too much:', error)
        res.status(401).json({message: 'Invalid token'})
    }
}

export default authMiddleware;