import { User } from '../../db/Sequelize.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { private_key } from '../../auth/private_key.js';

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
  }).then(user => {
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
    res.json({ msg: 'succes', user, token });
  }).catch(err => {
    res.status(400).json({msg:'something went wrong' , err})
  })
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
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
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
            return res.json({ msg: 'succes', token });
          } else {
            return res.status(403).json({ msg: 'you are not authorized' });
          }
        })
        .catch(err => {
          res.status(500).json({ msg: 'something went wrong' });
        });
    })
    .catch(err => {
      return res.status(404).json({ msg: 'user not found' , err });
    });
};
