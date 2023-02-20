import { getInternalClient } from './client/StarphishClient';
import { CacaError, UnauthorizedError } from './errors/UnauthorizedError';
import { getLogger } from './Logger';
import { DeployedPaths, FrontPaths, LocalPaths } from './Microservice';
import { extractAuth, isAuth } from './middleware/isAuth';

export {
  getLogger,
  UnauthorizedError,
  isAuth,
  extractAuth,
  getInternalClient,
  DeployedPaths,
  LocalPaths,
  FrontPaths,
  CacaError
};
