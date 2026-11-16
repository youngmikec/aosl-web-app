import axios from "axios";

// Same source as v1: REACT_APP_BASE_URL from .env
export const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL;
export const url: string | undefined = process.env.REACT_APP_BASE_URL;

// Same keys as v1 so a user signed in on one version stays signed in on the other.
export const TOKEN_KEY = "clientToken";
export const USER_KEY = "clientD";

export const readStored = <T = any>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
};

export const writeStored = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const http = axios.create({ baseURL: BASE_URL });

http.interceptors.request.use((config) => {
  const token = readStored<string>(TOKEN_KEY);
  if (token) (config.headers as Record<string, any>).Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 403 && readStored(TOKEN_KEY)) {
      clearSession();
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  },
);

export const errorMessage = (err: any, fallback = "Something went wrong. Please try again."): string =>
  err?.response?.data?.message || err?.message || fallback;

export default http;
