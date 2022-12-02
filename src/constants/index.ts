import { Path } from 'mongoose';

import { clientSchema } from 'src/models/client';
import { employeeSchema } from 'src/models/employee';
import { membersSchema } from 'src/models/members';
import { projectSchema } from 'src/models/project';
import { userSchema } from 'src/models/user';

export const entitiesSchemaKeys: { [key: string]: Path[] } = {
  client: Object.keys(clientSchema.paths),
  employee: Object.keys(employeeSchema.paths),
  member: Object.keys(membersSchema.paths),
  project: Object.keys(projectSchema.paths),
  user: Object.keys(userSchema.paths),
};
