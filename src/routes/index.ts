import express from 'express';

import clientRouter from 'src/routes/client';
import employeeRouter from 'src/routes/employee/index';
import memberRouter from 'src/routes/members';
import projectRouter from 'src/routes/project';
import userRouter from 'src/routes/user';

const router = express.Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);
router.use('/clients', clientRouter);
router.use('/employees', employeeRouter);
router.use('/members', memberRouter);

export default router;
