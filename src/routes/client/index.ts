import express from 'express';

import idValidationMiddleware from 'src/middlewares/validations';
import controllers from 'src/routes/client/controllers';

const router = express.Router();

router.route('/').get(controllers.getAllClients);

router.route('/:id').get(idValidationMiddleware, controllers.getClientById);

export default router;
