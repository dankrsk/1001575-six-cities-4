import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onSuccess, onError) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onFail = (err) => {
    const {response} = err;

    onError(response.status === Error.UNAUTHORIZED);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
