// import { json } from "body-parser"
import { Booking, User } from '../../db/Sequelize.js';

export const getDriversForARide = (req, res) => {
  console.log('req.query', req.query.start.toLowerCase());
  let str = req.query.start.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  console.log('temp', str);
  User.findAll({ where: { accessLevel: 1, city: str } })
    .then(drivers => {
      res.json({ msg: 'success', drivers });
    })
    .catch(err => {
      res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const createBooking = (req, res) => {
  const { DriverId, RiderId, start, end, price } = req.body;
  if (!DriverId || !RiderId || !start || !end || !price) {
    return res.status(400).json({ msg: 'all fiels are requiered' });
  }
  User.findByPk(DriverId)
    .then(driver => {
      if (!driver) {
        return res.status(404).json({ msg: 'driver not found' });
      }
      User.findByPk(RiderId)
        .then(rider => {
          if (!rider) {
            return res.status(404).json({ msg: 'rider not found' });
          }
          // here we got surely a diver an a rider
          Booking.create({
            start,
            end,
            price,
          })
            .then(booking => {
              booking.setDriver(driver).then(_ => {
                if (_) {
                  booking.setRider(rider).then(book => {
                    let temp1 = driver.toJSON();
                    let temp2 = rider.toJSON();
                    delete temp1.password;
                    delete temp2.password;
                    let temp3 = book.toJSON();
                    res.json({
                      msg: 'success',
                      booking: { ...temp3, driver: temp1, rider: temp2 },
                    });
                  });
                }
              });
            })
            .catch(err => {
              return res
                .status(400)
                .json({ msg: 'something went wrong 1', err });
            });
        })
        .catch(err => {
          return res.status(400).json({ msg: 'something went wrong 2', err });
        });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong 3', err });
    });
};

export const updateBooking = (req, res) => {
  const { userId, bookingId, state } = req.body;
  if (!userId || !bookingId || !state) {
    return res
      .status(400)
      .json({ msg: 'Something went wrong : All fields are required' });
  }
  Booking.findByPk(bookingId)
    .then(booking => {
      booking
        .update({ state })
        .then(book => {
          res.json({ msg: 'success', booking: book });
        })
        .catch(err => {
          res.status(400).json({ msg: 'Something went wrong' });
        });
    })
    .catch(err => {
      res.status(400).json({ msg: 'Something went wrong' });
    });
};
