import express from 'express';

import queryParamsOnSchemaValidation from 'src/middlewares/queryValidation';
import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router
  .route('/')
  .get(queryParamsOnSchemaValidation('user'), controllers.getAllUsers)
  .post(validations.createUser, controllers.createUser);

router.route('/userExists').get(controllers.userExists);

router
  .route('/:id')
  .get(idValidationMiddleware, controllers.getUserById)
  .patch(idValidationMiddleware, validations.updateUser, controllers.editUser);

router.route('/delete/:id').patch(idValidationMiddleware, controllers.deleteUser);

export default router;
