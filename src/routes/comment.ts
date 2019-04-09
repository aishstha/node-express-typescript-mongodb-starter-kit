import { Router } from 'express';

import authenticate from '../middlewares/authenticate';
import * as commentController from '../controllers/comment';

const router: Router = Router();

router.put('/:id/sub-comments', authenticate, commentController.createSubComment);
router.put('/:id/sub-comments/:subCommentId', authenticate, commentController.editSubComment);

export default router;
