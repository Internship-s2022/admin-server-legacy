import express from 'express';

import authMiddleware from 'src/middlewares/firebase';
import clientRouter from 'src/routes/client';
import cronJobRouter from 'src/routes/cronJobs';
import employeeRouter from 'src/routes/employee/index';
import memberRouter from 'src/routes/members';
import notificationsRouter from 'src/routes/notifications';
import projectRouter from 'src/routes/project';
import userRouter from 'src/routes/user';
import { AccessRoleType, MainRoutes } from 'src/types';

const router = express.Router();

router.use(MainRoutes.USERS, authMiddleware([AccessRoleType.SUPER_ADMIN]), userRouter);
router.use(MainRoutes.NOTIFICATIONS, authMiddleware([AccessRoleType.ADMIN]), notificationsRouter);
router.use(MainRoutes.PROJECTS, authMiddleware([AccessRoleType.ADMIN]), projectRouter);
router.use(MainRoutes.CLIENTS, authMiddleware([AccessRoleType.ADMIN]), clientRouter);
router.use(
  MainRoutes.EMPLOYEES,
  authMiddleware([AccessRoleType.ADMIN, AccessRoleType.SUPER_ADMIN]),
  employeeRouter,
);
router.use(
  MainRoutes.MEMBERS,
  authMiddleware([AccessRoleType.ADMIN, AccessRoleType.SUPER_ADMIN]),
  memberRouter,
);
router.use(MainRoutes.CRON, cronJobRouter);

export default router;
