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
    allowed: true,
    accessLevel: 0,
  },
  {
    userName: 'johnrider2',
    firstName: 'Super Rider',
    lastName: 'Johnny',
    sex: 'M',
    phone: '+1586655585',
    country: 'CA',
    city: 'Trinity',
    isValidated: true,
    email: 'brightyefoo@gmail.com',
    password: 'rider1234',
    allowed: true,
    accessLevel: 0,
  },
];

const drivers = [
  {
    userName: 'johndriver1',
    firstName: 'Driver',
    lastName: 'John',
    sex: 'M',
    phone: '+23765655585',
    country: 'CA',
    city: 'Angus',
    isValidated: true,
    email: 'brightefoo@gmail.com',
    password: 'driver1234',
    allowed: true,
    accessLevel: 1,
    vehicleNumber: 'AB 12 CD 1234',
  },
  {
    userName: 'johndriver2',
    firstName: 'Driver',
    lastName: 'Johnny',
    sex: 'M',
    phone: '+23765622285',
    country: 'CA',
    city: 'Ottawa',
    isValidated: true,
    email: 'johnnydriver@gmail.com',
    password: 'driver1234',
    allowed: true,
    accessLevel: 1,
    vehicleNumber: 'EF 34 GH 5678',
  },
  {
    userName: 'johndriver3',
    firstName: 'Drivess',
    lastName: 'Johnny',
    sex: 'M',
    phone: '+237658255585',
    country: 'CA',
    city: 'Quebec',
    isValidated: true,
    email: 'johnnydrivess@gmail.com',
    password: 'driver1234',
    allowed: true,
    accessLevel: 1,
    vehicleNumber: 'IJ 56 KL 9101',
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
