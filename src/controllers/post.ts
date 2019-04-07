import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

// import config from '../config/config';
import * as postService from '../services/postService';
import PostPayload from '../domain/requests/PostPayload';


/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const postPayload = req.body as PostPayload;

    const response = await postService.create(postPayload);

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
 * Controller to handle /post POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await postService.getById(req.params.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'data'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const searchKey = req.query.searchKey || '';
    const response = await postService.fetchAll(searchKey);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'All post'
    });
  } catch (err) {
    next(err);
  }
}
