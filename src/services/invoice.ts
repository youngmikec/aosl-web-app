import axios, { url } from './config';

// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_INVOICES = async (query: string = '') => {
    return axios.get(`${url}/invoice/publicRoute/${query}`);
};

export const RETREIVE_INVOICE_BY_ID = async (id: string = '', query: string = '') => {
    return axios.get(`${url}/invoice/publiceRoute/?_id=${id}${query}`);
};

export const CREATE_INVOICE = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/invoice/createInvoice`, data);
};

export const UPDATE_INVOICE_USER_DETAILS = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/invoice/updateInvoiceClientDetails${id}`, data);
};

export const UPDATE_USER_INVOICE = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/applications-user/${id}`, data);
};
export const DELETE_INVOICE = async (id: string) => {
    return axios.delete(`${url}/invoice/${id}`);
};