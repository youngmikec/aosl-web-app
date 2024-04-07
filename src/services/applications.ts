import axios, { url } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_APPLICATION = async (query: string = '') => {
    return axios.get(`${url}/applications/${query}`);
};

export const CREATE_APPLICATION = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/applications`, data);
};

export const UPDATE_APPLICATION = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/applications/${id}`, data);
};
export const DELETE_APPLICATION = async (id: string) => {
    return axios.delete(`${url}/applications/${id}`);
};