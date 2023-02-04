import { configureStore } from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import ShowroomReduce from '../slices/showroom';
import UserReducer from '../slices/user';
import MaterialReducer from '../slices/material';
import OrderSlice from '../slices/order';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        user: UserReducer,
        showroom: ShowroomReduce,
        material: MaterialReducer,
        order: OrderSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
