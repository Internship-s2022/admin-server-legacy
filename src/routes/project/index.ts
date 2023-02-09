import express from 'express';

import queryParamsOnSchemaValidation from 'src/middlewares/queryValidation';
import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router
  .route('/')
  .get(queryParamsOnSchemaValidation('project'), controllers.getAllProjects)
  .post(validations.createProject, controllers.createProject);

router
  .route('/:id')
  .get(idValidationMiddleware, controllers.getProjectById)
  .patch(idValidationMiddleware, validations.editProject, controllers.editProject);

router.route('/delete/:id').patch(idValidationMiddleware, controllers.deleteProject);

export default router;
