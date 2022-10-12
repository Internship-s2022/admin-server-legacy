import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router
  .route('/')
  .post(validations.createEmployee, controllers.createEmployee)
  .get(controllers.getAllEmployees);

router
  .route('/:id')
  .patch(idValidationMiddleware, validations.editEmployee, controllers.editEmployee)
  .get(idValidationMiddleware, controllers.getEmployeeById);

export default router;
