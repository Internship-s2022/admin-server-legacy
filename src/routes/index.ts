import express from 'express';

import clientRouter from 'src/routes/client';
import projectRouter from 'src/routes/project';
import userRouter from 'src/routes/user';

const router = express.Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);
router.use('/clients', clientRouter);

export default router;
