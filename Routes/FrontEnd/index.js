import { Router } from 'express';
import { FrontEndView } from '../../db/sequelize.js';
import { getOnePage, getPage } from './helpers.js';

export const pageRouter = Router();



pageRouter.route('/').get(getPage);

pageRouter.route('/:id').get(getOnePage)