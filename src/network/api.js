import axios from 'axios'
import * as Res from '../res'

export const axiosInstance = axios.create({
  baseURL: Res.Configs.BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

let storeInstance;

export function setStore(store) {
  storeInstance = store;
}

axiosInstance.interceptors.request.use(config => {
  if (storeInstance) {
    let userInfo = storeInstance.getState().user.userInfo;
    if (userInfo && userInfo.access_token) {
      config.headers.Authorization = `Bearer ${userInfo.access_token}`;
    }
  }
  config.params = {
    'country': Res.Configs.COUNTRY,
    'locale': Res.Configs.LOCALE,
    ...config.params
  };
  console.log('request', config);
  return config;
}, error => {
  console.log('requestError', error)
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  console.log('response', response.data)
  return response.data
}, error => {
  console.log('responseError', error)
  return Promise.reject(error)
});

function handleError(error) {
  let result = { message: Res.Strings.network_unknownError, status: 0 }
  let statusCode = error.response ? error.response.status : -1
  if(statusCode >= 400 && statusCode < 500) {
    if (error.response.data.error) {
      result = { message: error.response.data.error, status: statusCode }
    } else {
      result = { message: error.response.data, status: statusCode }
    }
  } else if(statusCode >= 500) {
    result = { message: Res.Strings.network_serverError, status: statusCode }
  } else if(statusCode == -1) {
    result = { message: Res.Strings.network_networkError, status: statusCode }
  }
  console.log('networkError', result)
  throw result
}

export function doGet(url, params) {
  return axiosInstance.get(url, {
    params: params
  })
  .catch(error => handleError(error))
}

export function doPost(url, data, params) {
  return axiosInstance.post(url, data, {
    params: params
  })
  .catch(error => handleError(error))
}

export function doPut(url, data, params) {
  return axiosInstance.put(url, data, {
    params: params
  })
  .catch(error => handleError(error))
}

export function doPatch(url, data, params) {
  return axiosInstance.patch(url, data, {
    params: params
  })
  .catch(error => handleError(error))
}