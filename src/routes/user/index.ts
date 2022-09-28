import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllUsers);
// router.get('/:id', controllers.getUserById);
// router.post('/', controllers.createUser);
// router.patch('/:id', controllers.editUser);
router.patch('/:id', idValidationMiddleware, controllers.deleteUser);

export default router;
