import { addBusinessDays, isWithinInterval } from 'date-fns';

import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

import { Project } from '../cronJobs/types';

const projectWithoutMembers = async (allProjects: Project[]) => {
  const promises: Promise<unknown>[] = [];

  allProjects.forEach((item) => {
    if (!item.members?.length && item.isActive && !item.members?.some((member) => member.active)) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.PROJECT,
        date: new Date(Date.now()),
        project: item._id?.toString(),
        reasonType: 301,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

const projectAboutToEnd = async (allProjects: Project[]) => {
  const promises: Promise<unknown>[] = [];

  allProjects.forEach((item) => {
    if (
      item.isActive &&
      item.endDate &&
      isWithinInterval(item.endDate, {
        start: new Date(),
        end: addBusinessDays(new Date(), 10),
      })
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.PROJECT,
        date: new Date(Date.now()),
        project: item._id?.toString(),
        reasonType: 302,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      promises.push(newNotification.save());
    }
  });
  await Promise.all(promises);
};

export { projectAboutToEnd, projectWithoutMembers };
