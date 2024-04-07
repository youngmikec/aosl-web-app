import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobState } from "../types";
import { Job } from "../../common/job";

const initialState: JobState = {
    value: [],
}

export const cryptosSlice = createSlice({
    name: "jobState",
    initialState,
    reducers: {
        INITIALIZE_JOBS: (state, action: PayloadAction<Job[]>) => {
            state.value = action.payload;
        },
        ADD_TO_JOBS: (state, action: PayloadAction<Job>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_JOB_STATE: (state, action: PayloadAction<Job>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_JOB: (state, action: PayloadAction<string>) => {
            const newState: Job[] = state.value.filter((item: Job) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_JOBS, ADD_TO_JOBS, UPDATE_JOB_STATE, REMOVE_JOB } = cryptosSlice.actions;

export default cryptosSlice.reducer;