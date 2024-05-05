import { configureStore } from "@reduxjs/toolkit";

import chatReducer from './Chat';
import userProfileReducer from './user';
import profileReducer from './profile';
import logotModalReducer from "./modal/logout-modal";
import applicationReducer from './application';
import jobReducer from './jobs-training';
import appModalReducer from './modal';


import ordersReducer from './orders/orders';


export const store = configureStore({
    reducer: {
        chatState: chatReducer,
        appModal: appModalReducer,
        applicationState: applicationReducer,
        jobState: jobReducer,
        orderState: ordersReducer,
        userProfile: userProfileReducer,
        profileState: profileReducer,
        logoutModal: logotModalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;