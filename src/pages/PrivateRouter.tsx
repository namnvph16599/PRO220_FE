import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const navigate = useNavigate();
    if (localStorage.getItem('accessToken')) {
        navigate('/');
    }
    return children;
};

export default PrivateRouter;
