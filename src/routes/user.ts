import { Router } from 'express';

import * as userController from '../controllers/user';

const router: Router = Router();

router.get('/', userController.getAll);
router.post('/signup', userController.create);
router.put('/:id', userController.update);
router.get('/:id', userController.getById);

export default router;
