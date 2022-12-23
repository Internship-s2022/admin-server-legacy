import cron from 'node-cron';

import NotificationsModel from 'src/models/notifications';

const notificationData = {
  notificationType: 'EMPLOYEE',
  date: '2022-12-13',
  employee: '6362af9589d8042257ae3d69',
  isActive: true,
  isCustom: false,
};

export const ExampleNotification = () => {
  cron.schedule(
    //everyday at midnight
    '0 0 * * *',
    async () => {
      try {
        const newNotification = new NotificationsModel({
          notificationType: 'EMPLOYEE',
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
