import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router
  .route('/')
  .get(controllers.getAllProjects)
  .post(validations.createProject, controllers.createProject);

router
  .route('/:id')
  .get(idValidationMiddleware, controllers.getProjectById)
  .patch(idValidationMiddleware, validations.editProject, controllers.editProject);

export default router;
