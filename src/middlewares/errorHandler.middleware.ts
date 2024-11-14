import { NextFunction, Request, Response } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.stack  )
    res.status(500).json({message: error.message, data: null, error: true})
}

export default errorHandler;