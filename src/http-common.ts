import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.itbook.store/1.0/',
  headers: {
    'Content-type': 'application/json',
  },
});

const dbClient: AxiosInstance = axios.create({
  baseURL: '/backend',
  headers: {
    'Content-type': 'application/json',
  },
});

export { apiClient as default, dbClient };
