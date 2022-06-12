import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://api.mmisme.cn/api/v1/',
  timeout: 20000,
});

request.interceptors.response.use((response) => {
  const res = response.data;

  if (res.code === '0') {
    return res;
  }
  return Promise.reject(res);
});
