import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);
router.patch('/:id', idValidationMiddleware, controllers.deleteUser);
router.post('/', validations.createUser, controllers.createUser);

export default router;
