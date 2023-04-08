import axios, { AxiosRequestConfig } from 'axios';
import { BareClient } from '@hmdlr/types';
import { InternalPaths, Microservice } from '../Microservice';

const defaultOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export interface InternalStarphishClient extends BareClient {
  get<T>(
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<T>;
  post<T>(
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T>;
  put<T>(
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T>;
  delete<T>(
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<T>;
  using(options: AxiosRequestConfig): InternalStarphishClient;
}

/**
 * Returns a client for internal microservices
 * @param microservice The microservice to target. Works like a base URL
 * @param axiosClient The axios client to use. Defaults to a new instance
 */
export const getInternalClient = (
  microservice: Microservice,
  axiosClient = axios.create()
): InternalStarphishClient => {
  const get = async <T>(
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.get(
      `${InternalPaths[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const post = async <T>(
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.post(
      `${InternalPaths[microservice]}/${uri}`,
      data,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const put = async <T>(
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.put(
      `${InternalPaths[microservice]}/${uri}`,
      data,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const deleteReq = async<T> (
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.delete(
      `${InternalPaths[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const using = (options: AxiosRequestConfig): InternalStarphishClient => (
    getInternalClient(microservice, axios.create(options))
  );

  return {
    get,
    post,
    put,
    delete: deleteReq,
    using,
  };
};
