import express from 'express';

import queryParamsOnSchemaValidation from 'src/middlewares/queryValidation';
import idValidationMiddleware from 'src/middlewares/validations';
import controllers from 'src/routes/client/controllers';
import validations from 'src/routes/client/validations';

const router = express.Router();

router
  .route('/')
  .get(queryParamsOnSchemaValidation('client'), controllers.getAllClients)
  .post(validations.createClient, controllers.createClient);

router
  .route('/:id')
  .get(idValidationMiddleware, controllers.getClientById)
  .patch(validations.updateClient, controllers.editClient);

router.route('/delete/:id').patch(idValidationMiddleware, controllers.deleteClient);

export default router;
