import { 
    Order, 
} from "../../common";
import { Application } from "../../common/application";
import { Job } from "../../common/job";

export type ApplicationState = {
    value: Application[];
  };
  export type JobState = {
    value: Job[];
  };

export type OrdersState = {
    value: Order[]
}