import React, { useEffect, useState } from 'react';
import {  Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {  ORDER_STATUS_TYPE } from '../../constants/order';

const Orders = () => {
    const navigate = useNavigate();
    const [path, setPath] = useState('');
    const { pathname } = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleClick = ({
        item: {
            props: { path },
        },
    }) => {
        navigate(`/cai-dat/quan-ly-don-hang/${path}`);
    };
    useEffect(() => {
        const subString = pathname.substring(9);
        if (subString) {
            setPath(subString);
        }
    }, [pathname]);
    const items = ORDER_STATUS_TYPE
        
    return (
        <div>
            <Menu
                onClick={handleClick}
                mode="horizontal"
                items={items}
                defaultSelectedKeys={['']}
                selectedKeys={[path]}
            />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Orders;
