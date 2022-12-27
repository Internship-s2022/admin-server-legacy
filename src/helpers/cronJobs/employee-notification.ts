import { addBusinessDays, isWithinInterval } from 'date-fns';

import EmployeeModel from 'src/models/employee';
import NotificationsModel from 'src/models/notifications';
import { NotificationType } from 'src/types';

import { Employee } from './types';

const employeesWithoutProjects = async () => {
  const allEmployees: Employee[] = await EmployeeModel.find()
    .populate('user', ['firstName', 'lastName', 'email', 'birthDate', 'isActive'])
    .populate({
      path: 'projectHistory',
      select: 'project role active',
      populate: {
        path: 'project',
        select: 'projectName startDate endDate isActive',
      },
    });

  allEmployees.forEach((employee) => {
    if (
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

const absenceEmployees = async () => {
  const allEmployees = await EmployeeModel.find().populate('user', [
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'isActive',
  ]);

  allEmployees.forEach((employee) => {
    if (
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
        employee: employee._id.toString(),
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
