import { getInternalClient, InternalStarphishClient } from './client/StarphishClient';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { kafkaConsumeMessage } from './kafka/Handler';
import { getLogger } from './Logger';
import { DeployedPaths, FrontPaths, LocalPaths } from './Microservice';
import { extractAuth, isAuth } from './middleware/isAuth';
import * as sdk from './sdk';

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
  sdk
};
