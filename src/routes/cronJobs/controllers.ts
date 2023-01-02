import 'dotenv/config';
import { Request, Response } from 'express';

import { execCronJobs } from 'src/helpers/cronJobs';
import { BodyResponse } from 'src/types';

export const cronHandler = async (
  req: Request,
  res: Response<BodyResponse<{ error: boolean; message: string }>>,
) => {
  try {
    const { authorization } = req.headers;

    if (authorization === `${process.env.API_SECRET_KEY}`) {
      await execCronJobs();
      res.status(200).json({ error: false, message: 'Notifications were created successfully' });
    } else {
      res.status(401).json({ error: true, message: 'Not allow' });
    }
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  cronHandler,
};
