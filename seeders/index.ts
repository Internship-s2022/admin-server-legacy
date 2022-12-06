import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import { DeleteResult } from 'mongodb';
import mongoose, { InsertManyResult } from 'mongoose';

// MODELS
import ClientModel from '../src/models/client';
import EmployeeModel from '../src/models/employee';
import MemberModel from '../src/models/member';
import ProjectModel from '../src/models/project';
import UserModel from '../src/models/user';
// TYPES
import { ClientData, EmployeeData, MemberData, ProjectData, UserData } from '../src/types/index';
import { config } from './config';
// DATA
import allData from './data';
import { FirebaseUsers } from './data/dev/firebase';

interface Data {
  clients: ClientData[];
  employees: EmployeeData[];
  members: MemberData[];
  projects: ProjectData[];
  users: UserData[];
  firebaseUsers: any[];
}

const environment = process.env.ENV || 'dev';

const { clients, employees, members, projects, users, firebaseUsers } = allData.dev;

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

// ------ BOARD ------ [end]

(async () => {
  console.log('     ----------------------');
  console.log('---- | Board configuration | ----');
  console.log('     ----------------------');
  Object.entries(config).forEach((item) => {
    if (typeof item[1] === 'boolean') {
      console.log(`     ▒ ${item[0]} ${item[1]}`);
    } else if (typeof item[1] === 'object') {
      const label = Object.entries(item[1])
        .filter((subItem) => subItem[1])
        .map((subItem) => subItem[0]);
      if (label.length) {
        console.log(`     ■ ${item[0]} ==> ${label}`);
      }
    }
  });

  // -------------- DATABASE CONNECTION -------------- [start]
  // -------------- DATABASE CONNECTION -------------- [end]

  try {
    await mongoose.connect(process.env.MONGO_URL || '');
    if (config.remove) {
      // ------------ REMOVE FIREBASE USERS ----------- [start]
      const promises: Promise<DeleteResult>[] = [];
      // remove firebase users
      let removeFirebaseUsers: Promise<void>[] = [];
      if (config.firebaseUsers.remove) {
        const firebaseCurrentUsers = await firebaseAdmin.auth().listUsers();
        removeFirebaseUsers = firebaseCurrentUsers.users.map((user) => {
          return firebaseAdmin.auth().deleteUser(user.uid);
        });
      }
      // ------------ REMOVE FIREBASE USERS -------- [end]

      // ------------ REMOVE MONGODB COLLECTIONS -- [start]
      if (config.clients.remove) {
        promises.push(ClientModel.collection.deleteMany({}));
      }
      if (config.employees.remove) {
        promises.push(EmployeeModel.collection.deleteMany({}));
      }
      if (config.members.remove) {
        promises.push(MemberModel.collection.deleteMany({}));
      }
      if (config.projects.remove) {
        promises.push(ProjectModel.collection.deleteMany({}));
      }
      if (config.users.remove) {
        promises.push(UserModel.collection.deleteMany({}));
      }
      // ------------ REMOVE MONGODB COLLECTIONS -- [end]

      await Promise.all([Promise.all(removeFirebaseUsers), Promise.all(promises)]);

      console.log('|-------------------- Previous data removed ----------------------|');
    }

    if (config.create) {
      const promises: Promise<InsertManyResult<any>>[] = [];
      let createFirebaseUsers: any[] = [];

      // ------------ CREATE FIREBASE USERS ----------- [start]
      if (config.firebaseUsers.create) {
        createFirebaseUsers = firebaseUsers.map((user: FirebaseUsers) => {
          return firebaseAdmin
            .auth()
            .createUser({ ...user })
            .then(async (userRecord) => {
              await firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, { role: user.role });
              return userRecord;
            });
        });
      }
      await Promise.all(createFirebaseUsers);

      // ------------ CREATE FIREBASE USERS ----------- [end]

      // ------------ UPLOAD MONGODB COLLECTIONS -- [start]
      if (config.clients.create) {
        promises.push(ClientModel.collection.insertMany(clients));
      }
      if (config.employees.create) {
        promises.push(EmployeeModel.collection.insertMany(employees));
      }
      if (config.members.create) {
        promises.push(MemberModel.collection.insertMany(members as any));
      }
      if (config.projects.create) {
        promises.push(ProjectModel.collection.insertMany(projects));
      }
      if (config.users.create) {
        promises.push(UserModel.collection.insertMany(users));
      }
      // ------------ UPLOAD MONGODB COLLECTIONS -- [end]
      await Promise.all(promises);

      console.log('|-------------------- New data added ----------------------|');
    }
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
