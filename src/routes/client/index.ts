import express from 'express';

import controllers from 'src/routes/client/controllers';

const router = express.Router();

router.route('/').get(controllers.getAllClients);

router.route('/:id').get(controllers.getClientById);

export default router;
