import * as utilService from '../utils/jwt';
import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import * as userService from '../services/userService';
import LoginPayload from '../domain/requests/LoginPayload';

import config from '../config/config';
import BadRequestError from '../exceptions/BadRequestError';

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.token) {
      throw new BadRequestError(config.ERROR_MESSAGE.TOKEN_REQUIRED);
    }
    
    const loginPayload = req.body as LoginPayload;
    const payload = await authService.verifyGoogleAccount(loginPayload.token);
    let user = await userService.findByGoogleId(payload.userId)

    if (!user.length) {
      const newUser = {
        name: payload.name,
        email: payload.email,
        userId: payload.userId,
        image: payload.imageUrl
      }
  
      user = await userService.create(newUser);
    }

    const tokenData = {id: user[0]._id};

    const accessToken = utilService.generateAccessToken(tokenData);
    const refreshToken = utilService.generateRefreshToken(tokenData);

    user = await userService.updateRefreshToken(user, refreshToken)

    const response = {
      name: user.name,
      email: user.email,
      image: user.image,
      accessToken,
      refreshToken
    }
    

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
 * Handle /refresh request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getAccesstoken(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenData = {id: res.locals.loggedInPayload.id};
    
    const accessToken = utilService.generateAccessToken(tokenData);

    res.status(HttpStatus.OK).json({
      accessToken,
      code: HttpStatus.OK,
      message: 'genereated'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle /refresh request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.body.refreshToken
    const user = await userService.findUserDetail(res.locals.loggedInPayload.id);
    console.log('user ', user)
    if (user){
      console.log('user', user);

      await userService.removeSession(user, token)
    }
    const response = [];

    res.status(HttpStatus.OK).json({
      response,
      code: HttpStatus.OK,
      message: 'genereated'
    });
  } catch (error) {
    next(error);
  }
}