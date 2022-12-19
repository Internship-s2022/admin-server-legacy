import 'dotenv/config';

// MODELS
import ClientModel from '../src/models/client';
import EmployeeModel from '../src/models/employee';
import MemberModel from '../src/models/members';
import ProjectModel from '../src/models/project';
import UserModel from '../src/models/user';
// DATA
import allData from './data';
import { EntitiesConfig } from './types';

const environment: string = process.env.ENV || 'dev';

const { clients, employees, members, projects, users, firebaseUsers } =
  allData[environment as keyof typeof allData];

export const entitiesConfig: EntitiesConfig = {
  clients: {
    remove: !!(process.env.CLIENTS_REMOVE === 'true'),
    create: !!(process.env.CLIENTS_CREATE === 'true'),
    model: ClientModel,
    data: clients,
  },
  employees: {
    remove: !!(process.env.EMPLOYEES_REMOVE === 'true'),
    create: !!(process.env.EMPLOYEES_REMOVE === 'true'),
    model: EmployeeModel,
    data: employees,
  },
  members: {
    remove: !!(process.env.MEMBERS_REMOVE === 'true'),
    create: !!(process.env.MEMBERS_CREATE === 'true'),
    model: MemberModel,
    data: members,
  },
  projects: {
    remove: !!(process.env.PROJECTS_REMOVE === 'true'),
    create: !!(process.env.PROJECTS_CREATE === 'true'),
    model: ProjectModel,
    data: projects,
  },
  users: {
    remove: !!(process.env.USERS_REMOVE === 'true'),
    create: !!(process.env.USERS_CREATE === 'true'),
    model: UserModel,
    data: users,
  },
};

export const firebaseConfig = {
  remove: !!(process.env.FIREBASE_USERS_REMOVE === 'true'),
  create: !!(process.env.FIREBASE_USERS_CREATE === 'true'),
  data: firebaseUsers,
};
