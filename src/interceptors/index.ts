import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { endRequest, startRequest } from '../redux/states/api';
import globalStore from '../redux/store';

export const onRequest = (request: InternalAxiosRequestConfig) => {
  globalStore.dispatch(startRequest());
  return request;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  globalStore.dispatch(endRequest());
  return response;
};

interface ResponseError {
  message: string;
}

export const onResponseError = (
  error: AxiosError<ResponseError>,
): Promise<AxiosError> => {
  globalStore.dispatch(endRequest());
  return Promise.reject(error);
};

export const onRequestMain = (
  request: AxiosRequestConfig,
): AxiosRequestConfig => {
  globalStore.dispatch(startRequest());
  return request;
};
