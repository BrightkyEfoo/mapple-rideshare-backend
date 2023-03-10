import { User } from '../../Sequelize.js';

const admins = [
  {
    userName: 'admin1',
    firstName: 'admin',
    lastName: 'John',
    sex: 'M',
    phone: '+237671964523',
    country: 'US',
    city: 'Trinity',
    isValidated: true,
    accessLevel : 3,
    email: 'admin@gmail.com',
    password: 'rider1234',
  },
];

const subadmin = [
  {
    userName: 'subadmin0',
    firstName: 'subadmin',
    lastName: 'John',
    sex: 'M',
    phone: '+23768655585',
    country: 'CA',
    city: 'Angus',
    isValidated: true,
    email: 'subadmin@gmail.com',
    password: 'driver1234',
    accessLevel : 2
  },
];

export const adminsFiller = () => {
  admins.map((el, i) => {
    User.create({ ...el })
      .then(() => {
        console.log('admin', i);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
  subadmin.map((el, i) => {
    User.create({ ...el })
      .then(() => {
        console.log('subadmin', i);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
};
