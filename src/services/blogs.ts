import axios, { url } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_BLOGS = async (query: string = '') => {
    return axios.get(`${url}/blog-posts/public/${query}`);
};

export const CREATE_BLOG = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/blog-posts`, data);
};

export const UPDATE_BLOG = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/blog-posts/${id}`, data);
};

export const DELETE_BLOG = async (id: string) => {
    return axios.delete(`${url}/blog-posts/${id}`);
};