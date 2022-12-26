import 'express-async-errors';
import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';
import { CronJobs } from './helpers/cron-jobs/';
import firebaseApp from './helpers/firebase';

const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || '';

mongoose.connect(MONGO_URL, (error) => {
  if (error) {
    console.log('Fail connection to database', error);
  } else {
    console.log('Connected to database');
    firebaseApp.appCheck();
    app.listen(port, () => {
      console.log(`Server ready on port ${port}`);
    });
  }
});

CronJobs();
