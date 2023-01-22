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

export const LocalPaths = {
  [Microservice.Authphish]: `http://localhost:${process.env.AUTHPHISH_PORT}/api`,
  [Microservice.Storephish]: `http://localhost:${process.env.STOREPHISH_PORT}`,
} as const;
