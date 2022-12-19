import { configureStore } from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import  ShowroomReduce  from '../slices/showroom';
import UserReducer from '../slices/user';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        user: UserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
