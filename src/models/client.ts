import { InferSchemaType, model, Schema } from 'mongoose';

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
  projects: {
    type: [String],
    required: true,
  },
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
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export type User = InferSchemaType<typeof clientSchema>;

export default model('User', clientSchema);
