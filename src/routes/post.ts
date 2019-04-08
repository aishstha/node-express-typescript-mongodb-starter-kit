import { Router } from 'express';

import * as postController from '../controllers/post';
import * as commentController from '../controllers/comment'

const router: Router = Router();

router.get('/', postController.getAll);
router.post('/', postController.create);
// router.put('/:id', userController.update);
router.get('/:id', postController.getById);
router.post('/:postId/comments', commentController.create)
// router.get('/:postId/comments', commentController.create)

export default router;
