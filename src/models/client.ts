import { model, Schema } from 'mongoose';

import { ClientData } from 'src/types';

export const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  localContact: {
    type: new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
    }),
    required: true,
  },
  clientContact: {
    type: new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
    }),
    required: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
  ],
  relationshipStart: {
    type: Date,
    required: false,
  },
  relationshipEnd: {
    type: Date,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default model<ClientData>('Client', clientSchema);
