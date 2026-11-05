import http, { url } from "./http";
import type { ApiResponse, V2Application } from "../models";

export type NewApplication = Omit<V2Application, "id" | "status" | "createdAt" | "code"> & {
  createdBy?: string;
};

export const submitApplication = (data: NewApplication) =>
  http.post<ApiResponse<V2Application>>(`${url}/applications-register`, data);

// The API does not scope /applications to the caller, so the user id must be passed as a filter.
export const fetchMyApplications = (userId: string) =>
  http.get<ApiResponse<V2Application[]>>(`${url}/applications/?createdBy=${encodeURIComponent(userId)}&sort=-createdAt`);
