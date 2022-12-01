import express from 'express';

import queryParamsOnSchemaValidation from 'src/middlewares/queryValidation';
import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.route('/').get(queryParamsOnSchemaValidation('employee'), controllers.getAllEmployees);

router
  .route('/:id')
  .patch(idValidationMiddleware, validations.editEmployee, controllers.editEmployee)
  .get(idValidationMiddleware, controllers.getEmployeeById);

export default router;
