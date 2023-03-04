import bcrypt from 'bcrypt';
import { User } from '../../db/Sequelize.js';
import jwt from 'jsonwebtoken';
import { private_key } from '../../auth/private_key.js';

export const adminLogin = (req, res) => {
  const { email, password, accessLevel } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'all fields are requiered' });
  }
  User.findOne({ where: { email } })
    .then(user => {
      if (user.accessLevel <= 1 || user.accessLevel !== accessLevel) {
        res.status(401).json({ msg: 'not authorized' });
      } else {
        bcrypt
          .compare(password, user.password)
          .then(_ => {
            if (_) {
              const temp = { ...user.toJSON() };
              delete temp.password;
              const token = jwt.sign(
                {
                  userId: user.id,
                  accessLevel: user.accessLevel,
                  email: user.email,
                },
                private_key,
                {
                  expiresIn: '24h',
                }
              );
              res.json({ msg: 'success', user: temp , token });
            } else {
              res.status(401).json({ msg: 'wrong password' });
            }
          })
          .catch(err => {
            res.status(400).json({ msg: 'something went wrong', err });
          });
      }
    })
    .catch(err => {
      res.status(400).json({ msg: 'something went wrong', err });
    });
};
