import axios from 'axios';
import { getItem } from '../utils';
import { handleLogout } from '../shared/logout-comp';

export const BASE_URL: any = process.env.REACT_APP_BASE_URL;

// axiosWithAuth.js (or any file name of your choice)

const axiosInstance = axios.create();

export const url: any = process.env.REACT_APP_BASE_URL;
const token = getItem('clientToken');
axiosInstance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axiosInstance.defaults.headers.common = {'Authorization': `Bearer ${token}`};

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it as-is
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // Token expired; redirect to the login screen
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

