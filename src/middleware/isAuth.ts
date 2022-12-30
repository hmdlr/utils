import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError';

/* eslint-disable @typescript-eslint/dot-notation */
function getTokenFromRequest(req: Request): string | undefined {
  let authHeader: string | string[] = req.headers['Authorization'] || req.headers['authorization'];
  if (Array.isArray(authHeader)) {
    [authHeader] = authHeader;
  }
  if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
    return authHeader.split(' ')[1];
  }
  return undefined;
}

/**
 * Middleware to check if the user is authenticated <br>
 * Sets the user in the request object as req['user'] <br>
 * The user object contains the user id and the username <br>
 * ### Returned object format: ###
 * <pre>
 * {
 *   id: string,
 *   username: string
 * }
 * </pre>
 * @param jwtSecret
 * @param req
 * @param res
 * @param next
 */
export const isAuth = (jwtSecret: string) => (/* every microservice will pass the secret as we don't access the env here */
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const bearer = getTokenFromRequest(req);
  if (!bearer) {
    throw new UnauthorizedError('Unauthorized');
  }
  try {
    req['user'] = {};
    req['user'].id = (jwt.verify(bearer, jwtSecret) as any).id;
    req['user'].username = (jwt.verify(bearer, jwtSecret) as any).username;
    next();
  } catch (e) {
    throw new UnauthorizedError('Unauthorized');
  }
};
