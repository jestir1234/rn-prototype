import axios from 'axios'
import * as Res from '../../res'

axios.defaults.baseURL = Res.Configs.BASE_URL;
axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
axios.interceptors.request.use(config => {
  //let token = store.getState().user.userInfo.access_token;
  //config.headers.Authorization = 'sdasdsad' //`Bearer ${token}`;
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

axios.interceptors.response.use(response => {
  //console.log('response', response.data)
  return response.data
}, error => {
  //console.log('responseError', error)
  return Promise.reject(error)
});

let handleError = (error) => {
  let result = { message: Res.Strings.network_unknownError, status: 0 }
  let statusCode = error.response ? error.response.status : -1
  if(statusCode >= 400 && statusCode < 500) {
    result = { message: error.response.data.error, status: statusCode }
  } else if(statusCode >= 500) {
    result = { message: Res.Strings.network_serverError, status: statusCode }
  } else if(statusCode == -1) {
    result = { message: Res.Strings.network_networkError, status: statusCode }
  }
  console.log('networkError', handledError)
  throw result
};

export const doGet = (getState, url, params) => {
  return axios.get(url, {
    params: params,
    headers: {
      'Authorization': `Bearer ${getState().user.userInfo.access_token}`
    }
  })
  .catch(error => handleError(error))
};