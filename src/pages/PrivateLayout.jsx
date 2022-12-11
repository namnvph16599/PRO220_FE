import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateLayout = ({ children }) => {
    // const user = useSelector((state)=>state.user)
    let a = 0
    if (localStorage.getItem("accessToken")) {
        const {role} = jwtDecode(localStorage.getItem("accessToken"))   
        a =role
    }
    if(!a == 1) return <Navigate to="/"/>
    return children;
};

export default PrivateLayout;
