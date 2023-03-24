import { getInternalClient, InternalStarphishClient } from './client/StarphishClient';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { kafkaConsumeMessage } from './kafka/Handler';
import { getLogger } from './Logger';
import { DeployedPaths, FrontPaths, LocalPaths } from './Microservice';
import { extractAuth, isAuth } from './middleware/isAuth';
import Storephish from './sdk/Storephish';
import _DIsetup from './sdk/_DIsetup';

_DIsetup();

export {
  getLogger,
  UnauthorizedError,
  isAuth,
  extractAuth,
  getInternalClient,
  InternalStarphishClient,
  DeployedPaths,
  LocalPaths,
  FrontPaths,
  kafkaConsumeMessage,
  Storephish
};
