import http, { url } from "./http";
import type { ApiResponse, V2LoginPayload, V2User } from "../models";

export const loginUser = (data: { email: string; password: string }) =>
  http.post<ApiResponse<V2LoginPayload>>(`${url}/users/login`, data);

export const registerUser = (data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  country: string;
}) => http.post<ApiResponse<V2User>>(`${url}/users/register`, data);

export const verifyEmail = (data: { email?: string; code: string }) =>
  http.post<ApiResponse>(`${url}/users/verify`, data);

export const sendResetCode = (email: string) =>
  http.get<ApiResponse>(`${url}/users/resetCode/${encodeURIComponent(email)}`);

export const verifyResetCode = (data: { id: string; resetCode: string; email?: string }) =>
  http.post<ApiResponse>(`${url}/users/resetCode/verify`, data);

export const resetPassword = (data: { email: string; password: string }) =>
  http.post<ApiResponse>(`${url}/users/forgotPassword`, data);

export const fetchProfile = () => http.get<ApiResponse<V2User>>(`${url}/users/me`);

export const updateProfile = (data: Partial<V2User> & { password?: string }) =>
  http.put<ApiResponse<V2User>>(`${url}/user/me/update`, data);
