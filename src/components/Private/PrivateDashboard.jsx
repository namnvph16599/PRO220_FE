import React from 'react';
import { JwtDecode } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

const PrivateDashboard = ({ children }) => {
    const roleLogin = JwtDecode();
    if (roleLogin.role == "Quản Lý") {
        return <Navigate to="/admin/thong-ke-doanh-thu" />;        
    }
    console.log(roleLogin.role=="Nhân Viên Kho");
    if(roleLogin.role=="Nhân Viên Kho"){
        return <Navigate to="/admin/quan-ly-kho" />; 
    }
    return children;
};

export default PrivateDashboard;
