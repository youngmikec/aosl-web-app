import axios from './config';
import { BASE_URL } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;
const url: string | undefined = BASE_URL;

export const WELCOME_ROUTE = async () => {
    return axios.get(`${url}/welcome`);
};

export const LOGIN_USER = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/users/login`, data);
};

export const VERIFY_EMAIL = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/users/verify`, data);
};

export const RETRIEVE_PROFILE = async () => {
    return axios.get(`${url}/users/me`);
};

export const UPDATE_PROFILE = async (data: {[key: string]: any}) => {
    return axios.put(`${url}/user/me/update`, data);
};

export const VERIFY_RESET_CODE = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/users/resetCode/verify`, data);
};

export const SIGN_UP_USER = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/users/register`, data);
};

export const RESET_PASSWORD = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/users/forgotPassword`, data);
};

export const SEND_PASSWORD_RESET_CODE = async (email: string = '') => {
    return axios.get(`${url}/users/resetCode/${email}`);
};