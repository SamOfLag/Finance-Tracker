import {Router} from 'express'
import { getUserProfile } from '../controllers/user.controller'


const userRouter = Router()

userRouter.get('/profile', getUserProfile)

export default userRouter;