import axios, { url } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_CHAT_ROOMS = async (query: string = '') => {
    return axios.get(`${url}/chat-rooms/${query}`);
};

export const CREATE_CHATE_ROOM = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/create-room`, data);
};

export const UPDATE_CHATE_ROOM = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/chat-rooms/${id}`, data);
};
export const DELETE_CHATE_ROOM = async (id: string) => {
    return axios.delete(`${url}/chat-rooms/${id}`);
};