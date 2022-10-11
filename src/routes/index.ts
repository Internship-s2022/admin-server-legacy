import express from 'express';

import clientRouter from 'src/routes/client';
import projectRouter from 'src/routes/project';
import userRouter from 'src/routes/user';

const router = express.Router();

router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/client', clientRouter);

export default router;
