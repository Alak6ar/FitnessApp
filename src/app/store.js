import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../services/mainApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import verifyEmailReducer from "../features/auth/verifyEmailSlice";
import authReducer from  '../features/auth/authSlice'
import basketReducer from '../features/basket/basketSlice'
import totalAmountReducer from '../features/basket/totalAmountSlice'
import { productApi } from "../services/productApi";

export const store = configureStore({
    reducer: {
        verifyEmail: verifyEmailReducer,
        totalAmount: totalAmountReducer,
        [mainApi.reducerPath]: mainApi.reducer,
        [productApi.reducerPath]: productApi.reducer,

        basket: basketReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mainApi.middleware),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware),

    
    devTools: true
});

setupListeners(store.dispatch)