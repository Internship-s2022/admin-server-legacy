import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import { DeleteResult } from 'mongodb';
import mongoose, { InsertManyResult } from 'mongoose';

import { entitiesConfig, firebaseConfig } from './config';
import { FirebaseUsers } from './data/dev/firebase';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

const isCreating = process.env.CREATE === 'true';
const isRemoving = process.env.REMOVE === 'true';

(async () => {
  console.log('     ----------------------');
  console.log('---- | Board configuration | ----');
  console.log('     ----------------------');

  try {
    // -------------- DATABASE CONNECTION -------------- [start]
    await mongoose.connect(process.env.MONGO_URL || '');
    // -------------- DATABASE CONNECTION -------------- [end]

    if (isRemoving) {
      // ------------ REMOVE FIREBASE USERS ----------- [start]
      let removeFirebaseUsers: Promise<void>[] = [];
      if (firebaseConfig.remove) {
        const firebaseCurrentUsers = await firebaseAdmin.auth().listUsers();
        console.log('Removed Firebase users');
        removeFirebaseUsers = firebaseCurrentUsers.users.map((user) => {
          return firebaseAdmin.auth().deleteUser(user.uid);
        });
      }

      // ------------ REMOVE MONGODB COLLECTIONS -- [start]
      const removeEntities: Promise<DeleteResult>[] = [];
      Object.keys(entitiesConfig).forEach((entityName) => {
        const entity = entitiesConfig[entityName as keyof typeof entitiesConfig];
        if (entity.remove) {
          removeEntities.push(entity.model.collection.deleteMany({}));
          console.log(`Removed ${entityName}`);
        }
      });

      await Promise.all([Promise.all(removeFirebaseUsers), Promise.all(removeEntities)]);

      // ------------ REMOVE MONGODB COLLECTIONS -- [end]
      // ------------ REMOVE FIREBASE USERS -------- [end]

      console.log('|-------------------- Previous data removed ----------------------|');
    }

    if (isCreating) {
      let createFirebaseUsers: Promise<any>[] = [];

      // ------------ CREATE FIREBASE USERS ----------- [start]
      if (firebaseConfig.create) {
        console.log('Created Firebase users');
        createFirebaseUsers = firebaseConfig.data.map((user: FirebaseUsers) => {
          return firebaseAdmin
            .auth()
            .createUser({ ...user })
            .then(async (userRecord) => {
              await firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, { role: user.role });
              return userRecord;
            });
        });
      }

      // ------------ UPLOAD MONGODB COLLECTIONS -- [start]
      const createEntities: Promise<InsertManyResult<any>>[] = [];

      Object.keys(entitiesConfig).forEach((entityName) => {
        const entity = entitiesConfig[entityName as keyof typeof entitiesConfig];
        if (entity.create) {
          createEntities.push(entity.model.collection.insertMany(entity.data));
          console.log(`Created ${entityName}`);
        }
      });

      await Promise.all([Promise.all(createFirebaseUsers), Promise.all(createEntities)]);

      // ------------ CREATE FIREBASE USERS ----------- [end]
      // ------------ UPLOAD MONGODB COLLECTIONS -- [end]

      console.log('|-------------------- New data added ----------------------|');
    }

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
