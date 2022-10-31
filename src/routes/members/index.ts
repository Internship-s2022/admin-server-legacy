import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router
  .route('/')
  .get(controllers.getAllMembers)
  .post(validations.createMember, controllers.createMember);

router
  .route('/:id')
  .get(idValidationMiddleware, controllers.getMemberById)
  .patch(idValidationMiddleware, validations.editMember, controllers.editMember);

router.route('/delete/:id').patch(idValidationMiddleware, controllers.deleteMember);

export default router;
