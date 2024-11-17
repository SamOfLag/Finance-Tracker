import {Router} from 'express'
import { getAchievement } from '../controllers/achievement.controller'

const achievRouter = Router()

achievRouter.get('/', getAchievement)

export default achievRouter;