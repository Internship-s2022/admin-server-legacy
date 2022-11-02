import { InferSchemaType, model, Schema } from 'mongoose';

import { AccessRoleType } from 'src/routes/user/types';

const userSchema = new Schema({
  firebaseUid: {
    type: String,
    required: false,
  },
  accessRoleType: {
    type: String,
    enum: AccessRoleType,
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
  workedHours: {
    type: Number,
    required: false,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export type User = InferSchemaType<typeof userSchema>;

export default model('User', userSchema);
