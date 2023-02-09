import { ClientModel, EmployeeModel, MemberModel, ProjectModel, UserModel } from '../src/models';
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
    model:
      | typeof ClientModel
      | typeof EmployeeModel
      | typeof MemberModel
      | typeof ProjectModel
      | typeof UserModel;
    data: DataType;
  };
}
