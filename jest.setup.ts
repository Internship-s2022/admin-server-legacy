import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

const MONGO_URL = process.env.MONGO_URL || '';
beforeAll(async () => {
  // This is going to make a connection with the real database, so the test are going to be E2E tests.
  // If we want to mock this, we have to use mongodb memory server and use seeds to populate the database.
  await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});
