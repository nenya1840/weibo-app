import axios from 'axios';
import * as interceptors from './interceptors';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function getAxiosInstance(options) {
  const instance = axios.create();
  interceptors.install(instance, options);
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return instance;
}

function makeGet() {
  return function(url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'get',
      ...option
    })
  }
}


function makePost() {
  return function(url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'post',
      ...option
    })
  }
}


export default {
  get: makeGet(),
  post: makePost(),
};
