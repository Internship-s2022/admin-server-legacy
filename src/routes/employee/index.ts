import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.route('/').get(controllers.getAllEmployees);

router.route('/:id').get(idValidationMiddleware, controllers.getEmployeeById);

router.route('/').post(validations.createEmployee, controllers.createEmployee);

router
  .route('/:id')
  .patch(idValidationMiddleware, validations.editEmployee, controllers.editEmployee);

export default router;
