import { BlogPost, Job, Application, Order } from "../../common";

export type ApplicationState = {
  value: Application[];
};
export type BlogState = {
  value: BlogPost[];
};
export type JobState = {
  value: Job[];
};

export type OrdersState = {
    value: Order[]
}