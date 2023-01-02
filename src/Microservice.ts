export const Microservice = {
  Authphish: `http://authphish:${process.env.AUTHPHISH_PORT}/`,
  Storephish: `http://storephish:${process.env.STOREPHISH_PORT}/`,
} as const;
