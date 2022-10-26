import { model, Schema } from 'mongoose';

import { CriticalType, ProjectType } from 'src/routes/project/types';
import { ProjectData } from 'src/types';

const projectSchema = new Schema({
  clientName: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  projectName: {
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
    type: [String],
    required: false,
  },
  isCritic: {
    type: String,
    enum: CriticalType,
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

export default model<ProjectData>('Project', projectSchema);
