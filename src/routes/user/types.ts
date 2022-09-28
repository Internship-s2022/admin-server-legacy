import { AccesRoleType } from 'src/models/user';

export interface User {
  firebaseUid: string;
  accesRoleType: AccesRoleType;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  workedHours: number;
  isActive: boolean;
}
