import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.itbook.store/1.0/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
