import { model, Schema } from 'mongoose';

import { ClientData } from 'src/interfaces';

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ourContact: {
    type: String,
    required: true,
  },
  clientContact: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  ],
  relationshipStart: {
    type: Date,
    required: true,
  },
  relationshipEnd: {
    type: Date,
    required: true,
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
