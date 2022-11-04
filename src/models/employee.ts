import { model, Schema } from 'mongoose';

import { SeniorityType } from 'src/routes/employee/types';
import { EmployeeData, RoleType } from 'src/types';

const employeeSchema = new Schema({
  skills: [
    {
      type: String,
      required: false,
    },
  ],
  seniority: {
    type: String,
    enum: SeniorityType,
    required: false,
  },
  projectHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: false,
    },
  ],
  absences: [
    {
      type: new Schema({
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: false },
        motive: { type: String, required: true },
      }),
      required: false,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  potentialRole: [
    {
      type: String,
      enum: RoleType,
      required: false,
    },
  ],
  notes: {
    type: String,
    required: false,
  },
  careerPlan: {
    type: String,
    required: false,
  },
  availability: {
    type: Boolean,
    required: false,
  },
});

export default model<EmployeeData>('Employee', employeeSchema);
