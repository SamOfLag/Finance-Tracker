import express, {Request, Response, NextFunction} from 'express'
import { IAuthRequest } from '../types/interfaces'
import Achievement from '../models/Achievement'


export const getAchievement = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const achievement = await Achievement.find({userId})
        res.status(200).json({message: 'Achievement fetched!', data: achievement, error: false})
   
    } catch (error) {
        next (error)
    }
}