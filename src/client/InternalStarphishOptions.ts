import { AxiosRequestConfig } from 'axios';

export const bearerAuth = (
  bearer: string
): AxiosRequestConfig => ({ headers: { Authorization: `Bearer ${bearer}` } });
