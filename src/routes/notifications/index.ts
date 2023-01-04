import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router
  .route('/')
  .get(controllers.getAllNotifications)
  .post(validations.createNotification, controllers.createNotification);

router.route('/active').get(controllers.getActiveNotifications);

router.route('/:id').get(idValidationMiddleware, controllers.getNotificationById);

router.route('/delete/:id').patch(idValidationMiddleware, controllers.deleteNotification);

export default router;
