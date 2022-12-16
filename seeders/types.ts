import { Model } from 'mongoose';

import { ClientType } from './data/dev/clients';
import { EmployeesType } from './data/dev/employees';
import { MemberType } from './data/dev/members';
import { ProjectType } from './data/dev/projects';
import { UserType } from './data/dev/users';

export interface EntitiesConfig {
  [key: string]: {
    remove: boolean;
    create: boolean;
    model: Model<any>;
    data: EmployeesType | MemberType | ClientType | MemberType | UserType | ProjectType;
  };
}
