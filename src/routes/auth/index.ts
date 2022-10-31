import express from 'express';

// import idValidationMiddleware from 'src/middlewares/validations';
import controllers from './controllers';
import validations from './validations';

const router = express.Router();

router.route('/').patch(validations.authenticateUser, controllers.authenticateUser);

export default router;
