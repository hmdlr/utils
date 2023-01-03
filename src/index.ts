import { getClient } from './client/StarphishClient';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { getLogger } from './Logger';
import { extractAuth, isAuth } from './middleware/isAuth';

export {
  getLogger,
  UnauthorizedError,
  isAuth,
  extractAuth,
  getClient
};
