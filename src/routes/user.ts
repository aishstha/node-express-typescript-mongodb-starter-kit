import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import validateRefreshToken from '../middlewares/validateRefreshToken';

import * as userController from '../controllers/user';

const router: Router = Router();

router.get('/', authenticate, userController.getAll);
router.get('/profile', authenticate, userController.getUserDetail);
router.post('/signup', userController.create);
router.put('/', authenticate, userController.update);
router.get('/:id', userController.getById);

export default router;
