import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);
router.patch('/:id', idValidationMiddleware, controllers.deleteUser);

export default router;
