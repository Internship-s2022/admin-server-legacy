import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.route('/').get(controllers.getAllProjects);

router.route('/:id').get(controllers.getProjectById);
