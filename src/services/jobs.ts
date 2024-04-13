import axios, { url } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_JOBS_PUBLIC = async (query: string = '') => {
    return axios.get(`${url}/jobs-posts/${query}`);
};

export const RETREIVE_JOBS = async (query: string = '') => {
    return axios.get(`${url}/jobs/${query}`);
};

export const CREATE_JOBS = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/jobs`, data);
};

export const UPDATE_JOBS = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/jobs/${id}`, data);
};
export const DELETE_JOBS = async (id: string) => {
    return axios.delete(`${url}/jobs/${id}`);
};