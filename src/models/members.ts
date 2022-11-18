import { model, Schema } from 'mongoose';

import { MemberData, RoleType } from 'src/types';

const membersSchema = new Schema({
  helper: [
    {
      type: new Schema({
        helperReference: { type: Schema.Types.ObjectId, ref: 'Employee', required: false },
        dependency: { type: Number, required: true },
        dedication: { type: Number, required: true },
        isActive: { type: Boolean, required: true },
      }),
    },
  ],
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: false,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  role: {
    type: String,
    enum: RoleType,
    required: true,
  },
  memberDedication: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

export default model<MemberData>('Member', membersSchema);
