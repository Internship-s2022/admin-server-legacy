import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.route('/').get(controllers.getAllEmployees);

router.route('/:id').get(controllers.getEmployeeById);

router.route('/').post(controllers.createEmployee);

router.route('/:id').patch(controllers.editEmployee);

export default router;
