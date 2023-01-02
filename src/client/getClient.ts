import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Microservice } from '../Microservice';

const defaultOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export const getClient = () => ({
  async get(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.get(
      `${Microservice[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  },

  async post(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.post(
      `${Microservice[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  },

  async put(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.put(
      `${Microservice[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  },

  async delete(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.delete(
      `${Microservice[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  },
});
