import { model, Schema } from 'mongoose';

import { NotificationsData, NotificationType } from 'src/types';

const notificationSchema = new Schema({
  notificationType: {
    type: String,
    enum: NotificationType,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: false,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: false,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
  },
  limitDate: {
    type: Date,
    required: false,
  },
  reasonType: {
    type: Number,
    required: false,
  },
  isChecked: {
    type: Boolean,
    required: false,
  },
  customMessage: {
    type: String,
    required: false,
  },
  isCustom: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default model<NotificationsData>('Notification', notificationSchema);
