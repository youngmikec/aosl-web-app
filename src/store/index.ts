import { configureStore } from "@reduxjs/toolkit";
import airtimeOrderReducer from './orders/airtime-order';
import buyCryptoReducer from './orders/buy-crypto-order';
import buyGiftcardReducer from "./orders/buy-giftcard-order";
import sellCryptoReducer from './orders/sell-crypto-order';
import userProfileReducer from './user';
import profileReducer from './profile';
import logotModalReducer from "./modal/logout-modal";
import applicationReducer from './application';
import jobReducer from './jobs-training';
import appModalReducer from './modal';


import ordersReducer from './orders/orders';


export const store = configureStore({
    reducer: {
        appModal: appModalReducer,
        applicationState: applicationReducer,
        jobState: jobReducer,
        orderState: ordersReducer,
        AirtimeOrderSlice: airtimeOrderReducer,
        BuyGiftcardOrderSlice: buyGiftcardReducer,
        BuyCryptoOrderSlice: buyCryptoReducer,
        SellCryptoOrderSlice: sellCryptoReducer,
        userProfile: userProfileReducer,
        profileState: profileReducer,
        logoutModal: logotModalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;