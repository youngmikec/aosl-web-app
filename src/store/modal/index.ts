import { createSlice } from "@reduxjs/toolkit";

type Modal = {
    displayModal: boolean;
}


const initialState: Modal = {
    displayModal: false
}

export const appModalSlice = createSlice({
    name:'appModal',
    initialState,
    reducers:{
        OpenAppModal:(state) => {
            state.displayModal = true;
        },
        CloseAppModal:(state) => {
            state.displayModal = false;
        },
    }
});

export const { OpenAppModal, CloseAppModal } = appModalSlice.actions;
export default appModalSlice.reducer;