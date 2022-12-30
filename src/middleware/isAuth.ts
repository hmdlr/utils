import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError';

function getTokenFromRequest(req: Request): string | undefined {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
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
    // eslint-disable-next-line @typescript-eslint/dot-notation
	req['user'] = {};
    // eslint-disable-next-line @typescript-eslint/dot-notation
    req['user'].id = (jwt.verify(bearer, jwtSecret) as any).id;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    req['user'].username = (jwt.verify(bearer, jwtSecret) as any).username;
    next();
  } catch (e) {
    throw new UnauthorizedError('Unauthorized');
  }
};
