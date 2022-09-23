import 'express-async-errors';
import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';

const port = process.env.PORT || 3000;
// eslint-disable-next-line max-len
const MONGO_URL = process.env.MONGO_URL || '';

mongoose.connect(MONGO_URL, (error) => {
  if (error) {
    console.log('Fail connection to database', error);
  } else {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server ready on port ${port}`);
    });
  }
});
