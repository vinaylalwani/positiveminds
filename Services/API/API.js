import axios from 'axios';
import {Config} from '../../Config/index';

const ApiInstant = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/json;charset=UTF-8'
  },
});

function postFormDataApi(url, method = 'post', data, option) {
  var config = {
    url: Config.API_URL + url,
    method: 'post',
    data: data,
    option: option,
  };

  // console.log('config', config);

  return axios
    .post(config.url, config.data)
    .then(response => response)
    .catch(error => error);
}

function postApi(url, data, option) {
  // console.log('postApi', url, data, option);
  return ApiInstant.post(url, data, option).then(res => {
    // console.log('postApi', res);
    if (res.status === 200) {
      return res;
    }

    return null;
  });
}

function getApi(url, option) {
  return ApiInstant.get(url, option).then(res => {
    // console.log(res)
    if (res.status === 200) {
      return res;
    }

    return null;
  });
}

function deleteApi(url, option) {
  return ApiInstant.delete(url, option).then(res => {
    // console.log(res)
    if (res.status === 200) {
      return res;
    }

    return null;
  });
}

function putApi(url, option) {
  return ApiInstant.put(url, option).then(res => {
    // console.log(res)
    if (res.status === 200) {
      return res;
    }

    return null;
  });
}

function patchApi(url, data, option) {
  return ApiInstant.patch(url, data, option).then(res => {
    // console.log(res)
    if (res.status === 200) {
      return res;
    }

    return null;
  });
}

export const API = {
  postApi,
  getApi,
  deleteApi,
  putApi,
  postFormDataApi,
  patchApi,
};
