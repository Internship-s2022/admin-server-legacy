import { addBusinessDays, isWithinInterval } from 'date-fns';

import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

import { Employee } from './types';

const employeesWithoutProjects = (allEmployees: Employee[]) => {
  allEmployees.forEach((employee) => {
    if (
      employee.user.isActive &&
      !employee.projectHistory?.some(
        (member) =>
          member.active &&
          member.project?.isActive &&
          member.project?.endDate &&
          isWithinInterval(new Date(Date.now()), {
            start: member.project.startDate,
            end: member.project.endDate,
          }),
      )
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.EMPLOYEE,
        date: new Date(Date.now()),
        employee: employee._id?.toString(),
        reasonType: 101,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      newNotification.save();
    }
  });
};

const absenceEmployees = (allEmployees: Employee[]) => {
  allEmployees.forEach((employee) => {
    if (
      employee.user.isActive &&
      employee.absences?.some((absence) =>
        isWithinInterval(absence.startDate, {
          start: new Date(),
          end: addBusinessDays(new Date(), 10),
        }),
      )
    ) {
      const newNotification = new NotificationsModel({
        notificationType: NotificationType.EMPLOYEE,
        date: new Date(Date.now()),
        employee: employee._id?.toString(),
        reasonType: 102,
        isCustom: false,
        isChecked: false,
        isActive: true,
      });
      newNotification.save();
    }
  });
};

export { absenceEmployees, employeesWithoutProjects };
