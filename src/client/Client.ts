import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLogger } from '../Logger';
import { Microservice } from '../Microservice';

export class Client {
  private readonly logger = getLogger();

  private readonly defaultOptions: AxiosRequestConfig = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  public async get(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.get(
      `${Microservice[microservice]}/${uri}`,
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return response.data;
  }

  public async post(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.post(
      `${Microservice[microservice]}/${uri}`,
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return response.data;
  }

  public async put(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.put(
      `${Microservice[microservice]}/${uri}`,
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return response.data;
  }

  public async delete(
    microservice: keyof typeof Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const response = await axios.delete(
      `${Microservice[microservice]}/${uri}`,
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return response.data;
  }
}
