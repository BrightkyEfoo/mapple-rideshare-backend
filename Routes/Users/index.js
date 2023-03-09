import { Router } from 'express';
import { adminCreateUser, adminUpdateUser, createUser, deleUser, getAllRideHistory, getHistoryRide, getUsers, subAdminUpdate, updateUser, userLogin, verifyEmail } from './helpers.js';
import auth from '../../auth/auth.js';
import { MAdminVerif } from './middlewares/adminVerif.js';
import { MSubAdminVerif } from './middlewares/MSubAdminVerif.js';

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
UserRouter.route('/admin').post(MAdminVerif,adminCreateUser).delete(MAdminVerif , deleUser).put(MAdminVerif , adminUpdateUser)
UserRouter.route('/subadmin').put(MSubAdminVerif , subAdminUpdate)
UserRouter.route('/bookride').get(getHistoryRide)
UserRouter.route('/ride').get(getAllRideHistory)