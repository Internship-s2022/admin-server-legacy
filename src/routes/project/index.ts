import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';

const router = express.Router();

router.route('/').get(controllers.getAllProjects);

router.route('/:id').get(idValidationMiddleware, controllers.getProjectById);
