import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import './index.css';
import MainLayout from './layouts/main';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AdminLayout from './layouts/admin';
import BookingPage from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import BannerManage from './pages/Admin/Banner';
import ShowRoom from './pages/Admin/showRoom';
import PrivateLayout from './components/Private/PrivateLayout';
import PageNotFound from './pages/PageNotFound';
import UpdateBanner from './pages/Admin/Banner/UpdateBanner';
import PrivateRouter from './components/Private/PrivateRouter';

import OrderManage from './pages/Admin/Order';
import UpdateOrder from './pages/Admin/Order/UpdateOrder';
import Personal from './pages/Setting';
import UpdateProfile from './pages/Setting/UpdateProfile';
import PrivateSetting from './components/Private/PrivateSetting';
import ChangePassword from './pages/Setting/ChangePassword';
import Orders from './pages/Setting/Orders';
import CreateOrder from './pages/Admin/Order/CreateOrder';
import DrawerCreateShowroom from './pages/Admin/showRoom/DrawerCreateShowroom';
import DrawerUpdateShowroom from './pages/Admin/showRoom/DrawerUpdateShowroom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="dat-lich" element={<BookingPage />} />
                <Route
                    path="dang-nhap"
                    element={
                        <PrivateRouter>
                            <Login />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="cai-dat"
                    element={
                        <PrivateSetting>
                            <Personal />
                        </PrivateSetting>
                    }
                >
                    <Route index path="tai-khoan" element={<UpdateProfile />} />
                    <Route index path="doi-mat-khau" element={<ChangePassword />} />
                    <Route path="quan-ly-don-hang" element={<Orders />} />
                </Route>
                <Route path="dang-ky" element={<Register />} />
            </Route>
            <Route
                path="/admin"
                element={
                    <PrivateLayout>
                        <AdminLayout />
                    </PrivateLayout>
                }
            >
                <Route path="dang-ky" element={<Register />} />
                <Route path="quan-ly-banner" element={<BannerManage />} />
                <Route path="quan-ly-cua-hang" element={<ShowRoom />} />
                <Route path="them-cua-hang" element={<DrawerCreateShowroom />} />
                <Route path="quan-ly-cua-hang/:id" element={<DrawerUpdateShowroom />} />
                <Route path="quan-ly-banner/:id" element={<UpdateBanner />} />
                <Route path="don-hang" element={<OrderManage />} />
                <Route path="them-don-hang" element={<CreateOrder />} />
                <Route path="don-hang/:id" element={<UpdateOrder />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
