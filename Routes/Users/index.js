import { Router } from 'express';
import { createUser, getUsers, updateUser, userLogin, verifyEmail } from './helpers.js';
import auth from '../../auth/auth.js';

// const transporter = nodemailer.createTransport({
//   host: 'dmservices.dev',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'mapple-rideshare@dmservices.dev',
//     pass: 'r9,6-?9V?8k?',
//   },
// });






export const UserRouter = Router();


UserRouter.route('/').post(createUser);

UserRouter.route('/verify-email').post(auth , verifyEmail);

UserRouter.route('/login').post(userLogin);

UserRouter.use(auth)
UserRouter.route('/').put(updateUser).get(getUsers)
