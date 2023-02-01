export enum Microservice {
  Authphish = 'authphish',
  Storephish = 'storephish'
}

export const InternalPaths = {
  [Microservice.Authphish]: `http://authphish:${process.env.AUTHPHISH_PORT}`,
  [Microservice.Storephish]: `http://storephish:${process.env.STOREPHISH_PORT}`,
} as const;

export const DeployedPaths = {
  [Microservice.Authphish]: 'https://auth.starphish.app/api',
  [Microservice.Storephish]: 'https://store.starphish.app',
} as const;

/* eslint-disable max-len */
export const LocalPaths = {
  [Microservice.Authphish]: `http://localhost:${process.env.AUTHPHISH_PORT || process.env.REACT_APP_AUTHPHISH_PORT}/api`,
  [Microservice.Storephish]: `http://localhost:${process.env.STOREPHISH_PORT || process.env.REACT_APP_STOREPHISH_PORT}`,
} as const;
/* eslint-enable max-len */

/* eslint-disable max-len */
export const FrontPaths = {
  [Microservice.Authphish]: `http://localhost:${process.env.FRONTPHISH_PORT || process.env.REACT_APP_FRONTPHISH_PORT}`,
} as const;
/* eslint-enable max-len */
