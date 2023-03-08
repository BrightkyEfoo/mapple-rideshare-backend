import { Op } from 'sequelize';
import { Booking, User } from '../../Sequelize.js';

const bookings = [
  {
    start: 'Ottawa',
    end: 'Quebec',
    state: 0,
    price: 150.9,
  },
  {
    start: 'Torronto',
    end: 'Quebec',
    state: 2,
    price: 110.59,
  },
  {
    start: 'Quebec',
    end: 'Quebec',
    state: 1,
    price: 100.0,
  },
];

export const bookingFiller = () => {
    // setTimeout()
  User.findOne({ where: { accesslevel: 1 } }).then(driver => {
    User.findOne({ where: { accessLevel: 0 } }).then(rider => {
    //   console.log('rider', driver);
      bookings.forEach((el, i) => {
        Booking.create({ ...el })
          .then(booking => {
            booking.setRider(rider).then(_ => {
              booking.setDriver(driver);
            });

            console.log('booking', i);
          })
          .catch(err => {
            console.log('err', err);
          });
      });
    });
  });
};
