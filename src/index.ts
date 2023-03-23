import { getInternalClient, StarphishClient } from './client/StarphishClient';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { kafkaConsumeMessage } from './kafka/Handler';
import { getLogger } from './Logger';
import { DeployedPaths, FrontPaths, LocalPaths } from './Microservice';
import { extractAuth, isAuth } from './middleware/isAuth';

export {
  getLogger,
  UnauthorizedError,
  isAuth,
  extractAuth,
  getInternalClient,
  StarphishClient,
  DeployedPaths,
  LocalPaths,
  FrontPaths,
  kafkaConsumeMessage
};
