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

// const drivers = [
//   {
//     userName: 'johndriverer1',
//     firstName: 'Driver',
//     lastName: 'John',
//     sex: 'M',
//     phone: '+23765655585',
//     country: 'CA',
//     city: 'Angus',
//     isValidated: true,
//     email: 'brightefoo@gmail.com',
//     password: 'driver1234',
//     accessLevel : 1
//   },
// ];

export const adminsFiller = () => {
  admins.map((el, i) => {
    User.create({ ...el })
      .then(() => {
        console.log('rider', i);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
};
