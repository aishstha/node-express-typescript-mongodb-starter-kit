import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/userService';
import UserPayload from '../domain/requests/UserPayload';

const { messages } = config;

/**
 * Controller to handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    let searchKey = req.query.searchKey || '';
    const response = await userService.fetchAll(searchKey);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.fetchAll
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
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload = req.body as UserPayload;

    const response = await userService.create(userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
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
    const userPayload = req.body as UserPayload;

    const response = await userService.update(req.params.id,userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
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
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await userService.getById(req.params.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}
