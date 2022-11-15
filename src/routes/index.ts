import express from 'express';

import authMiddleware from 'src/middlewares/firebase';
import clientRouter from 'src/routes/client';
import employeeRouter from 'src/routes/employee/index';
import memberRouter from 'src/routes/members';
import projectRouter from 'src/routes/project';
import userRouter from 'src/routes/user';
import { AccessRoleType } from 'src/types';

const router = express.Router();

router.use('/users', userRouter);
router.use('/projects', authMiddleware(AccessRoleType.ADMIN), projectRouter);
router.use('/clients', authMiddleware(AccessRoleType.ADMIN), clientRouter);
router.use('/employees', authMiddleware(AccessRoleType.ADMIN), employeeRouter);
router.use('/members', authMiddleware(AccessRoleType.ADMIN), memberRouter);

export default router;
