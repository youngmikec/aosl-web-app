import axios, { url } from './config';

// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_INVOICES = async (query: string = '') => {
    return axios.get(`${url}/invoice/publicRoute/${query}`);
};

export const RETREIVE_INVOICE_BY_CODE = async (code: string = '', query: string = '') => {
    return axios.get(`${url}/invoice/publiceRoute/?invoiceCode=${code}${query}`);
};

export const CONFIRM_AND_CAPTURE_INVOICE_ORDER = async (id: string): Promise<any> => {
    return axios.get(`${url}/invoice/confirmAndCaptureOrder?orderId=${id}`);
}

export const CREATE_INVOICE = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/invoice/createInvoice`, data);
};

export const INITIATE_INVOICE_PAYMENT = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/invoice/create-order`, data);
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