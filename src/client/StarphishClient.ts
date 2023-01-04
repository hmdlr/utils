import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MicroservicePaths, Microservice } from '../Microservice';

const defaultOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export interface StarphishClient {
  get<T>(
    microservice: Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<T>;
  post<T>(
    microservice: Microservice,
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T>;
  put<T>(
    microservice: Microservice,
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T>;
  delete(
    microservice: Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>;
  authenticate(
    bearerToken?: string
  ): void;
}

/**
 * Assumes your environment variables are set up correctly because it's
 * going to make use of **process.env.<microservice_port>'s**
 */
export const getClient = (axiosClient = axios.create()): StarphishClient => {
  /**
   * Authenticates the client with the given bearer token
   * by setting axios interceptor on the `Authorization` header
   * @param bearerToken
   */
  function authenticate(bearerToken?: string): void {
    if (!bearerToken) {
      return;
    }
    axiosClient.interceptors.request.use((config) => {
      if (!config.headers) {
        config.headers = {};
      }
      /* eslint-disable */
      config.headers['Authorization'] = `Bearer ${bearerToken}`;
      config.headers['authorization'] = `Bearer ${bearerToken}`;
      /* eslint-enable */
      return config;
    });
  }

  const get = async <T>(
    microservice: Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.get(
      `${MicroservicePaths[microservice]}${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const post = async <T>(
    microservice: Microservice,
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.post(
      `${MicroservicePaths[microservice]}/${uri}`,
      data,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const put = async <T>(
    microservice: Microservice,
    uri: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosClient.put(
      `${MicroservicePaths[microservice]}/${uri}`,
      data,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  const deleteReq = async (
    microservice: Microservice,
    uri: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    const response = await axiosClient.delete(
      `${MicroservicePaths[microservice]}/${uri}`,
      {
        ...defaultOptions,
        ...options,
      }
    );
    return response.data;
  };

  return {
    get,
    post,
    put,
    delete: deleteReq,
    authenticate,
  };
};
