import {
    configureStore
} from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import OrderSlice from '../slices/order';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        order: OrderSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;