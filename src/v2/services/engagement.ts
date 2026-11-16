import http, { url } from "./http";
import type { ApiResponse, V2ContactMessage } from "../models";

export const sendContactMessage = (data: V2ContactMessage) =>
  http.post<ApiResponse>(`${url}/mails`, data);

export const subscribeToNewsletter = (data: { subscriberEmail: string; phone?: string }) =>
  http.post<ApiResponse>(`${url}/subscribers`, data);
