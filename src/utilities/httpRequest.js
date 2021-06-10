import axios from 'axios';

const request = async (httpVerb, url, params) => {

  return await httpVerb(url, params)
    .then((res) => res.data)
    .catch(errorHandler);
}

const errorHandler = (error) => {
  const status = error?.response?.status;
  if (!status) {
    throw Error('Server unavailable');
  } else {
    throw error
  }
}

const _http = {
  GET: (url, params = {}) => {
    return request(axios.get, url, params);
  },
  POST: (url, params = {}) => {
    return request(axios.post, url, params);
  },
  PUT: (url, params = {}) => {
    return request(axios.put, url, params);
  },
  DELETE: (url, params = {}) => {
    return request(axios.delete, url, params);
  }
}

export { _http };
