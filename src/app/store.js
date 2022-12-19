import {
    configureStore
} from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import UserReducer from '../slices/user';
import OrderSlice from '../slices/order';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        user: UserReducer,
        order: OrderSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;