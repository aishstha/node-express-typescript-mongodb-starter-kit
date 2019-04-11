import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

// import config from '../config/config';
import * as commentService from '../services/commentService';
import CommentPayload from '../domain/requests/CommentPayload';

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const commentPayload = req.body as CommentPayload;

    const response = await commentService.create(commentPayload, req.params.postId, res.locals.loggedInPayload.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function editSubComment(req: Request, res: Response, next: NextFunction) {
  try {
    const subCommentPayload = req.body as CommentPayload;

    const response = await commentService.updateSubComment(subCommentPayload, req.params.id, req.params.subCommentId, res.locals.loggedInPayload.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createSubComment(req: Request, res: Response, next: NextFunction) {
  try {
    const subCommentPayload = req.body as CommentPayload;

    const response = await commentService.createSubComment(subCommentPayload, req.params.id, res.locals.loggedInPayload.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const commentPayload = req.body as CommentPayload;

    const response = await commentService.update(req.params.id, commentPayload, res.locals.loggedInPayload.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'abc'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function removeSubComment(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await commentService.removeSubComment(req.params.id, req.params.subCommentId);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err);
  }
}
