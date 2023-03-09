import { Booking, User } from '../../db/Sequelize.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { private_key } from '../../auth/private_key.js';
import { Op } from 'sequelize';

export let Codes = [];

const transporter = nodemailer.createTransport({
  host: 'dmservices.dev',
  port: 465,
  secure: true,
  auth: {
    user: 'mapple-rideshare@dmservices.dev',
    pass: 'r9,6-?9V?8k?',
  },
});

export const createUser = (req, res) => {
  const {
    accessLevel,
    acceptNewsletters,
    city,
    country,
    email,
    phone,
    firstName,
    lastName,
    password,
    sex,
    userName,
  } = req.body;
  if (
    !userName ||
    (!accessLevel && accessLevel !== 0) ||
    accessLevel > 1 ||
    // !acceptNewsletters ||
    !city ||
    !country ||
    !email ||
    !phone ||
    !firstName ||
    !lastName ||
    !password ||
    !sex ||
    !userName ||
    !sex
  ) {
    return res.status(400).json({
      msg:
        accessLevel > 1
          ? 'you cant have an accesslevel greater then 1'
          : 'all fields are required',
    });
  }
  User.create({
    acceptNewsletters,
    city,
    country,
    email,
    phone,
    firstName,
    lastName,
    password,
    sex,
    userName,
    accessLevel,
  })
    .then(user => {
      let code = String(parseInt(999999 * Math.random())).padStart(6, 0);

      const mailOptions = {
        from: 'mapple-rideshare@dmservices.dev',
        to: email,
        subject: 'Validate your email',
        text: `the code of your registration is : ${code}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          Codes.push({
            email,
            code: parseInt(code),
          });
          console.log('codes', Codes);
          console.log('Email sent: ' + info.response);
        }
      });
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          isValidated: user.isValidated,
          accessLevel: user.accessLevel,
        },
        private_key,
        {
          expiresIn: '24h',
        }
      );
      res.json({ msg: 'succes', user, token });
    })
    .catch(err => {
      res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const verifyEmail = (req, res) => {
  const { code, email } = req.body;
  const item = Codes.filter(el => el.code === code && el.email === email)[0];
  if (item) {
    const mailOptions = {
      from: 'mapple-rideshare@dmservices.dev',
      to: email,
      subject: 'Validate your email',
      text: `You have succesfully verified your email`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('codes', Codes);
        console.log('Email sent: ' + info.response);
      }
    });
    if (req.user.email === email) {
      User.findOne({ where: { email } })
        .then(user => {
          Codes = Codes.filter(el => el.email !== email);
          user
            .update({ isValidated: true })
            .then(use => {
              const token = jwt.sign(
                {
                  userId: user.id,
                  email: user.email,
                  isValidated: user.isValidated,
                  accessLevel: user.accessLevel,
                },
                private_key,
                {
                  expiresIn: '24h',
                }
              );
              res.json({ msg: 'succes', user: use, token });
            })
            .catch(err => {
              res.status(500).json({ msg: 'something went wrong errno : 2' });
            });
        })
        .catch(err => {
          res.status(500).json({ msg: 'something went wrong errno : 1' });
        });
    } else {
      res.status(401).json({ msg: 'you are not authorized, wrong email' });
    }
  } else {
    res.status(404).json({ msg: 'something went wrong' });
  }
};

export const userLogin = (req, res) => {
  const { email, password, accessLevel } = req.body;
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
      }
      if (accessLevel !== user.accessLevel) {
        return res.status(404).json({
          msg: `It looks like you are a ${
            user.accessLevel === 0 ? 'rider' : 'driver'
          }, please click the right login button`,
        });
      }
      if (accessLevel > 1) {
        return res.status(301).json({ msg: 'you can do that' });
      }
      bcrypt
        .compare(password, user.password)
        .then(_ => {
          if (_) {
            let code = String(parseInt(999999 * Math.random())).padStart(6, 0);

            const mailOptions = {
              from: 'mapple-rideshare@dmservices.dev',
              to: email,
              subject: 'Validate your email',
              text: `the code of your registration is : ${code}`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                Codes.push({
                  email,
                  code: parseInt(code),
                });
                console.log('codes', Codes);
                console.log('Email sent: ' + info.response);
              }
            });
            const token = jwt.sign(
              {
                userId: user.id,
                email: user.email,
                isValidated: user.isValidated,
              },
              private_key,
              {
                expiresIn: '24h',
              }
            );
            let temp = user.toJSON();
            delete temp.password;
            return res.json({ msg: 'succes', user: temp, token });
          } else {
            return res.status(403).json({ msg: 'you are not authorized' });
          }
        })
        .catch(err => {
          res.status(500).json({ msg: 'something went wrong' });
        });
    })
    .catch(err => {
      return res.status(404).json({ msg: 'user not found', err });
    });
};

export const updateUser = (req, res) => {
  const { userId, userSubmit } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ msg: 'userId should not be empty please fill it and try again' });
  } else {
    if (!req.user.isValidated) {
      res
        .status(403)
        .json({ msg: 'Your email is not verified, please do it before' });
    } else {
      User.findByPk(userId)
        .then(userToUpdate => {
          if (userSubmit.password) {
            bcrypt.hash(userSubmit.password, 10, (err, hash) => {
              if (err) {
                return err;
              }
              userToUpdate
                .update({ ...userSubmit, password: hash })
                .then(user => {
                  let temp = user.toJSON();
                  delete temp.password;
                  res.json({ msg: 'success', user: temp });
                })
                .catch(err => {
                  return res
                    .status(400)
                    .json({ msg: 'Something went wrong', err });
                });
            });
          } else {
            userToUpdate
              .update({ ...userSubmit })
              .then(user => {
                let temp = user.toJSON();
                delete temp.password;
                res.json({ msg: 'success', user: temp });
              })
              .catch(err => {
                return res
                  .status(400)
                  .json({ msg: 'Something went wrong', err });
              });
          }
        })
        .catch(err => {
          return res.status(400).json({ msg: 'Something went wrong', err });
        });
    }
  }
};

export const getUsers = (req, res) => {
  let { userId } = req.query;
  userId = parseInt(userId);
  // const {limit}
  if (!userId) {
    return res.status(400).json({ msg: 'all fields are requiered' });
  }
  if (req.user.accessLevel < 2) {
    return res.status(401).json({ msg: 'unauthorized' });
  } else {
    User.findByPk(userId)
      .then(user => {
        if (user.accessLevel === req.user.accessLevel && user.id === userId) {
          if (req.user.accessLevel === 2) {
            User.findAll({
              where: {
                accessLevel: {
                  [Op.lte]: req.user.accessLevel === 2 ? 2 : 3,
                },
                id: {
                  [Op.ne]: parseInt(userId),
                },
              },
              attributes: { exclude: ['password'] },
            })
              .then(users => {
                res.json({ msg: 'success', users });
              })
              .catch(err => {
                return res
                  .status(400)
                  .json({ msg: 'something went wrong', err });
              });
          } else if (req.user.accessLevel === 3) {
            User.findAll({
              where: {
                id: {
                  [Op.not]: userId,
                },
              },
              attributes: { exclude: ['password'] },
            })
              .then(users => {
                res.json({ msg: 'success', users });
              })
              .catch(err => {
                return res
                  .status(400)
                  .json({ msg: 'something went wrong', err });
              });
          }
        } else {
          return res.status(401).json({ mag: 'aie aie not allowed' });
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({ msg: 'something went wrong went retriving the admin', err });
      });
  }
};

export const adminCreateUser = (req, res) => {
  const {
    accessLevel,
    acceptNewsletters,
    city,
    country,
    email,
    phone,
    firstName,
    lastName,
    password,
    sex,
    userName,
  } = req.body?.submission;
  if (
    !userName ||
    (!accessLevel && accessLevel !== 0) ||
    // !acceptNewsletters ||
    !city ||
    !country ||
    !email ||
    !phone ||
    !firstName ||
    !lastName ||
    !password ||
    !sex ||
    !userName ||
    !sex
  ) {
    return res.status(400).json({ msg: 'all fields are required' });
  }
  User.create({
    accessLevel: parseInt(accessLevel),
    acceptNewsletters,
    city,
    country,
    email,
    phone,
    firstName,
    lastName,
    password,
    sex,
    userName,
    isValidated: true,
  })
    .then(user => {
      let temp = user.toJSON();
      delete temp.password;
      res.json({ msg: 'success', user: temp });
    })
    .catch(err => {
      return res
        .status(400)
        .json({ msg: 'something went wrong went retriving the admin', err });
    });
};

export const deleUser = (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(404).json({
      msg: 'you sould provide the id of the user you want delete via query',
    });
  }
  User.findByPk(parseInt(id)).then(user => {
    if (user.accessLevel === 3) {
      return res.status({ msg: 'unathorized, you cant delete this user' });
    }
    user
      .destroy()
      .then(use => {
        res.json({ msg: 'succes', user: use });
      })
      .catch(err => {
        res.status(400).json({ msg: 'something went wrong' });
      });
  });
};

export const adminUpdateUser = (req, res) => {
  const { id, submission } = req.body;
  if (!id) {
    return res.status(404).json({
      msg: 'you sould provide the id of the user you want delete via query',
    });
  }
  User.findByPk(id).then(user => {
    if (submission.password) {
      bcrypt.hash(submission.password, 10, (err, hash) => {
        if (err) {
          throw new Error(
            'something went wrong when encrypting password of user after creating'
          );
        }
        user.update({ ...submission, password: hash }).then(usertemp => {
          // console.log('user', usertemp.toJSON());
          let temp = usertemp.toJSON();
          delete temp.password;
          res.json({ msg: 'success', user: temp });
        });
      });
    } else {
      user.update({ ...submission }).then(usertemp => {
        // console.log('user', usertemp.toJSON());
        let temp = usertemp.toJSON();
        delete temp.password;
        res.json({ msg: 'success', user: temp });
      });
    }
  });
};

export const subAdminUpdate = (req, res) => {
  const { userId, id, allowed } = req.body;
  if (!id || (!allowed && allowed !== false)) {
    return res.status(400).json({ msg: 'all fields are requiered' });
  }
  User.findByPk(id)
    .then(userToUpdate => {
      userToUpdate
        .update({ allowed })
        .then(user => {
          res.json({ msg: 'success' });
        })
        .catch(err => {
          res.status(400).json({ msg: 'something went wrong', err });
        });
    })
    .catch(err => {
      res.status(400).json({ msg: 'something went wrong 2', err });
    });
};

export const getHistoryRide = (req, res) => {
  const { UserId } = req.query;
  if (!UserId) {
    return res.status(400).json({ msg: 'you should provide your user id' });
  }
  console.log('UserId', UserId);
  Booking.findAll({
    where: { RiderId: parseInt(UserId) },
    include: [
      { model: User, as: 'rider' },
      { model: User, as: 'driver' },
    ],
  })
    .then(history => {
      console.log('history', history);
      res.json({ msg: 'succes', history });
    })
    .catch(err => {
      res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const getAllRideHistory = (req, res) => {
  const { userId } = req.query;
  if (!userId || req.user.accessLevel < 2) {
    return res.status(401).json({ msg: 'unauthorized 1' });
  }

  Booking.findAll({
    include: [
      { model: User, as: 'rider' },
      { model: User, as: 'driver' },
    ],
  })
    .then(history => {
      
      const Temp = history.map(el => {
        let temp = el.toJSON()
        delete temp.rider.password
        delete temp.driver.password
        return {...temp}
      })
      res.json({ msg: 'success', history : Temp });
    })
    .catch(err => {
      res.status(400).json({ msg: 'something went wrong', err });
    });
};
