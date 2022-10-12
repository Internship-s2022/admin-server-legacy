import { InferSchemaType, model, Schema } from 'mongoose';

import { RoleType, SeniorityType } from 'src/routes/employee/types';

const employeeSchema = new Schema({
  skills: {
    type: [String],
    required: false,
  },
  seniority: {
    type: String,
    enum: SeniorityType,
    required: true,
  },
  projectHistory: {
    type: [String],
    required: false,
  },
  absences: {
    type: [String],
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  potentialRole: {
    type: [String],
    enum: RoleType,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

export type Employee = InferSchemaType<typeof employeeSchema>;

export default model('Employee', employeeSchema);
