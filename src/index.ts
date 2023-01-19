import 'express-async-errors';
import 'dotenv/config';
import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import app from './app';
import logger from './config/logger';
import firebaseApp from './helpers/firebase';
import errorHandler from './middlewares/errorHandler';

const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || '';

if (process.env.ENV && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    environment: process.env.ENV,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        return (
          !error?.status || error.status === 500 || error.status === 401 || error.status === 403
        );
      },
    }),
  );
}

app.use(errorHandler);

mongoose.connect(MONGO_URL, (error) => {
  if (error) {
    logger.log({
      level: 'error',
      message: '🔴 Database error: ',
      errorData: error,
      label: 'mongo',
    });
  } else {
    logger.log({ level: 'info', message: '✅ Database connected', label: 'mongo' });
    firebaseApp.appCheck();
    app.listen(port, () => {
      logger.log({
        level: 'info',
        message: `Radium Admin server listening on port ${port}`,
        label: 'server',
      });
    });
  }
});
