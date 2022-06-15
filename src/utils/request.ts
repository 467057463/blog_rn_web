import axios from 'axios';
import rootStore from '@/store';

export const request = axios.create({
  baseURL: 'https://api.mmisme.cn/api/v1/',
  timeout: 20000,
});

request.interceptors.request.use((config) => {
  if (rootStore.userStore.data) {
    config.headers!.Authorization = `Bearer ${rootStore.userStore.data.token}`;
  }
  return config;
});

request.interceptors.response.use((response) => {
  const res = response.data;

  if (res.code === '0') {
    return res;
  }
  return Promise.reject(res);
});
