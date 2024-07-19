import axios from 'axios';
import Cookies from 'js-cookie';

import { notify } from '@/shared/utils/notification';

const API_URL = import.meta.env.VITE_API_URL;

export const nonAuthApiV1Instance = axios.create({
  baseURL: API_URL,
  headers: {}
});

nonAuthApiV1Instance.interceptors.response.use(config => {
  if (config.data?.exception) {
    notify(config.data?.exception, 'error');
    throw new Error(config.data?.exception);
  }

  return config;
});

const apiV1Instance = axios.create({
  baseURL: API_URL,
  headers: {}
});

apiV1Instance.interceptors.request.use(config => {
  // get access token from cookie (browser)
  const accessTokenCookieVal = Cookies.get('access_token');
  config.headers['Authorization'] = 'Bearer ' + accessTokenCookieVal;

  return config;
});

apiV1Instance.interceptors.response.use(config => {
  if (config.data?.exception) {
    notify(config.data?.exception, 'error');
    throw new Error(config.data?.exception);
  }

  return config;
});

export { apiV1Instance };
