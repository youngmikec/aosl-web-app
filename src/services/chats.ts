import axios, { url } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_CHAT_MESSAGES = async (query: string = '') => {
    return axios.get(`${url}/chat-messages/${query}`);
};

export const SEND_CHAT_MESSAGE = async (data: {[key: string]: any}) => {
  return axios.post(`${url}/send-message`, data);
};

export const UPDATE_CHAT_MESSAGE = async (id: string, data: {[key: string]: any}) => {
  return axios.put(`${url}/chat-messages/${id}`, data);
};
export const DELETE_CHAT_MESSAGE = async (id: string) => {
  return axios.delete(`${url}/chat-messages/${id}`);
};