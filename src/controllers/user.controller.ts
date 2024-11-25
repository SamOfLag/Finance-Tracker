import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { IAuthRequest } from '../types/interfaces';
import ErrorResponse from '../utils/errorResponse';


export const getUserProfile = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log('User ID from token:', req.userId);
    const userId = req.userId;
    if (!userId) {
        return next(new ErrorResponse('User ID not found in request', 400));
      }
    // Fetch user data from the database
    const user = await User.findById(userId).select('username email');

    if (!user) {
      return next (new ErrorResponse('User not found', 404))
    }

    res.status(200).json({message: 'User profile fetched successfully', 
        data: {
        username: user.username,
        email: user.email,
      },
      error: false,
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    next(error);
  }
};
