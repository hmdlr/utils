import { bearerAuth } from './client/InternalStarphishOptions';
import { getInternalClient, InternalStarphishClient } from './client/StarphishClient';
import { getCDNPath } from './CommonMappers';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { kafkaConsumeMessage } from './kafka/Handler';
import { getLogger } from './Logger';
import { DeployedPaths, FrontPaths } from './Microservice';
import { extractAuth, isAuth } from './middleware/isAuth';
import Authphish from './sdk/Authphish';
import Scanphish from './sdk/Scanphish';
import Similaryphish from './sdk/Similaryphish';
import Storephish from './sdk/Storephish';

export {
  getLogger,
  UnauthorizedError,
  isAuth,
  extractAuth,
  getInternalClient,
  InternalStarphishClient,
  bearerAuth,
  DeployedPaths,
  FrontPaths,
  kafkaConsumeMessage,
  Storephish,
  Authphish,
  Scanphish,
  Similaryphish,
  getCDNPath
};
