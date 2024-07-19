import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios';

import Auth from './auth';

const { VITE_API_HOST_MT } = import.meta.env;

export class BaseService {
  private readonly service: AxiosInstance;

  constructor(baseUrl?: string) {
    this.service = axios.create({
      baseURL: baseUrl ?? VITE_API_HOST_MT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    this.service.interceptors.request.use(
      config => {
        config.headers = { ...(config.headers ?? {}) } as AxiosHeaders;
        console.log(Auth.token);
        if (Auth.token && !config.headers['isIgnoreAuth']) {
          config.headers['Authorization'] = `Bearer ${Auth.token}`;
        } else {
          delete config.headers['Authorization'];
        }
        delete config.headers['isIgnoreAuth'];
        return config;
      },
      error => Promise.reject(error)
    );

    this.service.interceptors.response.use(
      response => {
        if (
          response.status === 200 &&
          (response.data?.status === 401 || response.data?.status === 403)
        ) {
          Auth.logout();
          return Promise.reject(null);
        }
        return response;
      },
      error => this.handleError(error)
    );
  }

  private handleError = (
    error: AxiosError,
    customErrorHandler?: (error: AxiosResponse) => Promise<never>
  ): Promise<never> => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      Auth.logout();
      return Promise.reject(new Error('Server error'));
    }

    if (customErrorHandler) {
      return customErrorHandler(error.response as AxiosResponse);
    }
    return Promise.reject(error.response?.data);
  };

  public get = async <TRequest, TResponse>(
    path: string,
    params: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse, TRequest> = await this.service.get(path, {
      params,
      paramsSerializer: { indexes: null },
      ...config
    });
    return response.data;
  };

  public post = async <TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse, TRequest> = await this.service.post(
      path,
      data,
      config
    );
    return response.data;
  };

  public put = async <TRequest, TResponse>(
    path: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse, TRequest> = await this.service.put(path, data, config);
    return response.data;
  };

  public del = async <TRequest, TResponse>(
    path: string,
    params: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse, TRequest> = await this.service.delete(path, {
      params,
      ...config
    });
    return response.data;
  };

  public request = async <TRequest, TResponse>(
    path: string,
    params: TRequest,
    method: Method | string,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse, TRequest> = await this.service.request({
      url: path,
      method,
      params,
      ...config
    });
    return response.data;
  };
}
