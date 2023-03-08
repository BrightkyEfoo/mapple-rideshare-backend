import {Router} from 'express'
import auth from '../../auth/auth.js'
import { createBooking, getDriversForARide, updateBooking } from './helpers.js'

export const mapRouter = Router()

// mapRouter.use(auth)

mapRouter.route('/booking').post(createBooking).put(updateBooking)
mapRouter.route('/drivers').get(getDriversForARide)