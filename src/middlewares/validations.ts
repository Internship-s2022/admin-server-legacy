import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { CustomError } from 'src/helpers/customErrorModel';

const idValidationMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError(400, 'The user id is invalid');
  }
  next();
};

export default idValidationMiddleware;
