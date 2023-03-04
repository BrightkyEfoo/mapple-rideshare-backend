import { User } from '../../Sequelize.js';

const riders = [
  {
    userName: 'johnrider1',
    firstName: 'Rider',
    lastName: 'John',
    sex: 'M',
    phone: '+1536655585',
    country: 'US',
    city: 'Trinity',
    isValidated: true,
    email: 'brightkyefoo@gmail.com',
    password: 'rider1234',
  },
];

const drivers = [
  {
    userName: 'johndriverer1',
    firstName: 'Driver',
    lastName: 'John',
    sex: 'M',
    phone: '+23765655585',
    country: 'CA',
    city: 'Angus',
    isValidated: true,
    email: 'brightefoo@gmail.com',
    password: 'driver1234',
    accessLevel : 1
  },
];

export const ridersAndDriversFiller = () => {
  riders.map((el, i) => {
    User.create({ ...el })
      .then(() => {
        console.log('rider', i);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
  drivers.map((el, i) => {
    User.create({ ...el })
      .then(() => {
        console.log('driver', i);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
};
