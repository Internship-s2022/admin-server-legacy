import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const parseError = (error: any) => {
  if (error.code !== 'ERR_NETWORK') {
    throw {
      message: error.response.data.message,
      networkError: false,
    };
  }
  throw {
    message: error.message,
    networkError: true,
  };
};

interface ErrorFormat {
  message: string;
  networkError: boolean;
}

const responseBody = (response: AxiosResponse) => response.data;

export const addResourceRequest = <T>(apiRoute: any, body: T) =>
  api.post<T>(apiRoute, body).then(responseBody).catch<ErrorFormat>(parseError);

export default api;
