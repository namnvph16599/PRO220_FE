import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { JwtDecode } from '../utils/auth';

const PrivateLayout = ({ children }) => {
    let permission = 0
    const navigate = useNavigate();
    if (localStorage.getItem("accessToken")) {
        navigate('/')
        const {role} = JwtDecode()   
        permission =role
    }
    if(!permission == 1) return <Navigate to="/"/>
    return children;
};

export default PrivateLayout;
