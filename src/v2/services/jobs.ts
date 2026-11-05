import http, { url } from "./http";
import type { ApiResponse, V2Job } from "../models";

// Jobs and trainings share one collection (Job.type = WORK | TRAINING); callers split them client-side.
export const fetchPublicJobs = () => http.get<ApiResponse<V2Job[]>>(`${url}/jobs-posts/`);
