import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const idValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The user id is invalid',
      data: undefined,
      error: true,
    });
  }
  next();
};

export default idValidationMiddleware;
