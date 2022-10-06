import { InferSchemaType, model, Schema } from 'mongoose';

export enum CritcalType {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum ProjectType {
  STAFF_AUMENTATION = 'STAFF_AUMENTATION',
  PROJECT_BUILDING = 'PROJECT_BUILDING',
}

const projectSchema = new Schema({
  clientName: {
    type: String,
    required: true,
  },
  porjectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  members: {
    type: Array,
    required: false,
  },
  isCritic: {
    type: String,
    enum: CritcalType,
    required: true,
  },
  isUpdated: {
    type: Boolean,
    required: true,
  },
  projectType: {
    type: String,
    enum: ProjectType,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export type Project = InferSchemaType<typeof projectSchema>;

export default model('Project', projectSchema);
