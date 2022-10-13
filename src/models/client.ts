import { model, Schema } from 'mongoose';

import { ClientData } from 'src/interfaces';

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  localContact: {
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
