export interface BodyResponse<T> {
  message: string;
  data?: T;
  error: boolean;
}

export interface UserData {
  firebaseUid: string;
  accessRoleType: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  workedHour?: number;
  isActive: boolean;
}
