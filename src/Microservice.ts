export enum Microservice {
  Authphish = 'authphish',
  Storephish = 'storephish',
  Scanphish = 'scanphish',
  Similaryphish = 'similaryphish'
}

export const InternalPaths = {
  [Microservice.Authphish]: `http://authphish:${process.env.AUTHPHISH_PORT}`,
  [Microservice.Storephish]: `http://storephish:${process.env.STOREPHISH_PORT}`,
  [Microservice.Scanphish]: `http://scanphish:${process.env.SCANPHISH_PORT}`,
  [Microservice.Similaryphish]: `http://similaryphish:${process.env.SIMILARYPHISH_PORT}`,
} as const;

const baseDomain = process.env.NODE_ENV === 'production'
  ? 'starphish.app'
  : 'starphish.app.localhost';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export const DeployedPaths = {
  [Microservice.Authphish]: `${protocol}://auth.${baseDomain}`,
  [Microservice.Storephish]: `${protocol}://store.${baseDomain}`,
  [Microservice.Scanphish]: `${protocol}://scan.${baseDomain}`,
} as const;

/* eslint-disable max-len */
export const FrontPaths = {
  auth: `${protocol}://${baseDomain}`,
  workspace: `${protocol}://workspace.${baseDomain}`,
} as const;
/* eslint-enable max-len */
