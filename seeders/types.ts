import { Model } from 'mongoose';

import { ClientData, EmployeeData, MemberData, ProjectData, UserData } from '../src/types';
import { ClientType } from './data/dev/clients';
import { EmployeesType } from './data/dev/employees';
import { MemberType } from './data/dev/members';
import { ProjectType } from './data/dev/projects';
import { UserType } from './data/dev/users';

export type DataType =
  | EmployeesType
  | MemberType
  | ClientType
  | MemberType
  | UserType
  | ProjectType;

export interface EntitiesConfig {
  [key: string]: {
    remove: boolean;
    create: boolean;
    model: Model<
      unknown,
      unknown,
      unknown,
      unknown,
      EmployeeData | MemberData | ClientData | MemberData | ProjectData | UserData
    >;
    data: DataType;
  };
}
