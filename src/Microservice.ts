export enum Microservice {
  Authphish = 'authphish',
  Storephish = 'storephish'
}

export const MicroservicePaths = {
  [Microservice.Authphish]: `http://authphish:${process.env.AUTHPHISH_PORT}/`,
  [Microservice.Storephish]: `http://storephish:${process.env.STOREPHISH_PORT}/`,
} as const;
