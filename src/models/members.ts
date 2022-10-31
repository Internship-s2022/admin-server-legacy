import { model, Schema } from 'mongoose';

import { MemberData, RoleType } from 'src/types';

const membersSchema = new Schema({
  hasHelper: {
    type: Boolean,
    required: false,
  },
  helper: [
    {
      type: Schema.Types.ObjectId,
      required: false,
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
  dedication: {
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
