import Sequelize from 'sequelize';
import FrontEndViewModel from '../Models/FrontEndViewModel.js';
import { navBarFiller } from './Fillers/FrontEndViewModel/NavBarFiller.js';
import { FooterFiller } from './Fillers/FrontEndViewModel/FooterFiller.js';
import { HomePageFiller } from './Fillers/FrontEndViewModel/HomePageFiller.js';
import { riderLoginFormFiller } from './Fillers/FrontEndViewModel/RiderLoginForm.js';
import UserModel from '../Models/User.js';
import { ridersAndDriversFiller } from './Fillers/user/RidersAndDriversFiller.js';
import { AdminLoginFormsFiller } from './Fillers/FrontEndViewModel/AdminLoginFormFiller.js';
import { adminsFiller } from './Fillers/user/AdminFiller.js';
import { BookRideFiller } from './Fillers/FrontEndViewModel/BookRide.js';
import BookingModel from '../Models/Booking.js';
import { bookingFiller } from './Fillers/bookingFiller/BookingFiller.js';

const sequelize = new Sequelize('mapple-rideshare', 'mapple-rideshare', 'AVNS_MHgW68zXzO4IigxVh0k', {
  host: 'adn-do-user-7091938-0.b.db.ondigitalocean.com',
  port : 25060,
  dialect: 'mysql',
  logging: false,
})

// const sequelize = new Sequelize('mapple-rideshare', 'root', '', {
//   host: 'localhost',
//   dialect: 'mariadb',
//   logging: false,
// });

export const FrontEndView = FrontEndViewModel(sequelize);
export const User = UserModel(sequelize);
export const Booking = BookingModel(sequelize);

// User.hasMany(Booking, {
//   foreignKey: 'id'
// });
Booking.belongsTo(User, {
  as: 'rider',
  foreignKey: {
    // allowNull : false,
    name: 'RiderId',
  },
});

Booking.belongsTo(User, {
  as: 'driver',
  foreignKey: {
    // allowNull : false,
    name: 'DriverId',
  },
});

export const dbInit = () => {
  return sequelize
    .sync({ force: true })
    .then(() => {
      //populate db here
      navBarFiller();
      FooterFiller();
      HomePageFiller();
      riderLoginFormFiller();
      ridersAndDriversFiller();
      AdminLoginFormsFiller();
      adminsFiller();
      BookRideFiller();
      setTimeout(() => {
        bookingFiller();
      }, 2000);
      console.log('database connection successfully etablished');
    })
    .catch(err =>
      console.log('database connection unsuccessfully etablished', { err })
    );
};
