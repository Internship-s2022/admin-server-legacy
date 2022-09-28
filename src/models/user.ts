import { InferSchemaType, model, Schema } from 'mongoose';

export enum AccesRoleType {
  MANAGER = 'Manager',
  SUPER_ADMIN = 'Super_Admin',
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
}

const userSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  accessRoleType: {
    type: String,
    enum: AccesRoleType,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  workedHour: {
    type: Number,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export type User = InferSchemaType<typeof userSchema>;

export default model('User', userSchema);
