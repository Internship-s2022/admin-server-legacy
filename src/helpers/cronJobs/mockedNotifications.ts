import { NotificationsModel } from 'src/models';
import { NotificationType } from 'src/types';

export const mockedNotifications = async () => {
  try {
    const newNotification = new NotificationsModel({
      notificationType: NotificationType.EMPLOYEE,
      date: new Date(Date.now()),
      reasonType: 101,
      isCustom: true,
      isChecked: false,
      isActive: true,
      customMessage: `${new Date(Date.now())}: by Vercel`,
    });
    await newNotification.save();
  } catch (error) {
    return error;
  }
};
