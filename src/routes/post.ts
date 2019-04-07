import { Router } from 'express';

import * as postController from '../controllers/post';

const router: Router = Router();

router.get('/', postController.getAll);
router.post('/', postController.create);
// router.put('/:id', userController.update);
router.get('/:id', postController.getById);

export default router;
