import { configureStore } from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import  ShowroomReduce  from '../slices/showroom';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        showroom:ShowroomReduce
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
