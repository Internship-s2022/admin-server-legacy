import express from 'express';

import projectRouter from 'src/routes/project/index';
import userRouter from 'src/routes/user/index';

const router = express.Router();

router.use('/user', userRouter);
router.use('/project', projectRouter);

export default router;
