import cron from 'node-cron';

import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

export const ExampleNotification = () => {
  cron.schedule(
    //everyday at midnight
    '0 0 * * *',
    async () => {
      try {
        const newNotification = new NotificationsModel({
          notificationType: NotificationType.EMPLOYEE,
          date: new Date(Date.now()),
          employee: '6362af9589d8042257ae3d69',
          reasonType: 101,
          isCustom: false,
          isChecked: false,
          isActive: true,
        });

        newNotification.save();
      } catch (error) {
        console.error(error);
      }
    },
    {
      scheduled: true,
      timezone: 'America/Argentina/Buenos_Aires',
    },
  );
};
