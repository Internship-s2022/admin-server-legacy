import cron from 'node-cron';

import EmployeeModel from 'src/models/employee';
import MemberModel from 'src/models/members';
import NotificationsModel from 'src/models/notifications';

export const EmployeeNotification = () => {
  cron.schedule(
    //everyday at midnight
    '59 17 * * *',
    async () => {
      try {
        const allEmployees = await EmployeeModel.find().populate('user', [
          'firstName',
          'lastName',
          'email',
          'birthDate',
          'isActive',
        ]);

        const allMembers = await MemberModel.find();

        const filteredEmployees = allEmployees.filter(
          (employee) =>
            !allMembers.some(
              (member) => member.active && member.employee?.toString() === employee._id.toString(),
            ),
        );

        filteredEmployees.forEach(async (employee) => {
          const newNotification = new NotificationsModel({
            notificationType: 'EMPLOYEE',
            date: new Date(Date.now()),
            employee: employee._id.toString(),
            reasonType: 101,
            isCustom: false,
            isChecked: false,
            isActive: true,
          });

          newNotification.save();
        });
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
