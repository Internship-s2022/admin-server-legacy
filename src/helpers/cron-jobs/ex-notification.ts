import cron from 'node-cron';

const ExampleNotification = () => {
  cron.schedule('* * * * *', () => {
    console.log(
      new Date().toLocaleTimeString('es-AR'),
      'No puedo olvidar tus besos mojadoooooooooos',
    );
  });
};
