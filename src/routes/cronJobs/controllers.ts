import 'dotenv/config';
import { Request, Response } from 'express';

import { execCronJobs } from 'src/helpers/cronJobs';
import { CustomError } from 'src/helpers/customErrorModel';
import { BodyResponse } from 'src/types';

export const cronHandler = async (
  req: Request,
  res: Response<BodyResponse<{ error: boolean; message: string }>>,
) => {
  const { authorization } = req.headers;

  if (authorization === `${process.env.API_SECRET_KEY}`) {
    await execCronJobs();
    return res
      .status(200)
      .json({ error: false, message: 'Notifications were created successfully' });
  }
  throw new CustomError(401, 'Not allow');
};

export default {
  cronHandler,
};
