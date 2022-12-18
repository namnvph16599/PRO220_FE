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
import OrderManage from './pages/Admin/Order';
import UpdateOrder from './pages/Admin/Order/UpdateOrder';
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="dat-lich" element={<BookingPage />} />
                <Route path="dang-nhap" element={<PrivateRouter><Login /></PrivateRouter>} />
                <Route path="dang-ky" element={<Register />} />
            </Route>
            <Route path="/admin" element={<PrivateLayout><AdminLayout /></PrivateLayout>}>
                <Route path="dang-ky" element={<Register />} />
                <Route path="quan-ly-banner" element={<BannerManage />} />
                <Route path="don-hang" element={<OrderManage />} />
                <Route path="don-hang/:id" element={<UpdateOrder />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
