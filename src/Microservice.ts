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

const baseDomain = process.env.NODE_ENV === 'production' ? 'starphish.app' : 'ci.starphish.app';

export const DeployedPaths = {
  [Microservice.Authphish]: `http://auth.${baseDomain}`,
  [Microservice.Storephish]: `http://store.${baseDomain}`,
  [Microservice.Scanphish]: `http://scan.${baseDomain}`,
} as const;

/* eslint-disable max-len */
export const FrontPaths = {
  auth: `http://${baseDomain}`,
  workspace: `http://workspace.${baseDomain}`,
} as const;
/* eslint-enable max-len */
