import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "../types";
import { Application } from "../../common/application";

const initialState: ApplicationState = {
    value: [],
}

export const cryptosSlice = createSlice({
    name: "applicationState",
    initialState,
    reducers: {
        INITIALIZE_APPLICATIONS: (state, action: PayloadAction<Application[]>) => {
            state.value = action.payload;
        },
        ADD_TO_APPLICATIONS: (state, action: PayloadAction<Application>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_APPLICATION_STATE: (state, action: PayloadAction<Application>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i].id === action.payload.id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_APPLICATION: (state, action: PayloadAction<string>) => {
            const newState: Application[] = state.value.filter((item: Application) => item.id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_APPLICATIONS, ADD_TO_APPLICATIONS, UPDATE_APPLICATION_STATE, REMOVE_APPLICATION } = cryptosSlice.actions;

export default cryptosSlice.reducer;