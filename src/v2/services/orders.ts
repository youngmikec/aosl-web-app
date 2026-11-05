import http, { url } from "./http";
import type { ApiResponse, V2Order } from "../models";

// The API does not scope /orders to the caller, so the user id must be passed as a filter.
export const fetchMyOrders = (userId: string) =>
  http.get<ApiResponse<V2Order[]>>(`${url}/orders/?createdBy=${encodeURIComponent(userId)}&sort=-createdAt&populate=productService`);
