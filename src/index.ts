import { getInternalClient } from './client/StarphishClient';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { getLogger } from './Logger';
import { DeployedPaths, LocalPaths } from './Microservice';
import { extractAuth, isAuth } from './middleware/isAuth';

export {
  getLogger,
  UnauthorizedError,
  isAuth,
  extractAuth,
  getInternalClient,
  DeployedPaths,
  LocalPaths
};
