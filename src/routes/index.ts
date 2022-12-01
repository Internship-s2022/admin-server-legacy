import express from 'express';

import authMiddleware from 'src/middlewares/firebase';
import clientRouter from 'src/routes/client';
import employeeRouter from 'src/routes/employee/index';
import memberRouter from 'src/routes/members';
import projectRouter from 'src/routes/project';
import userRouter from 'src/routes/user';
import { AccessRoleType, MainRoutes } from 'src/types';

const router = express.Router();

router.use(MainRoutes.USERS, userRouter);
router.use(MainRoutes.PROJECTS, authMiddleware(AccessRoleType.ADMIN), projectRouter);
router.use(MainRoutes.CLIENTS, authMiddleware(AccessRoleType.ADMIN), clientRouter);
router.use(MainRoutes.EMPLOYEES, authMiddleware(AccessRoleType.ADMIN), employeeRouter);
router.use(MainRoutes.MEMBERS, authMiddleware(AccessRoleType.ADMIN), memberRouter);

export default router;
