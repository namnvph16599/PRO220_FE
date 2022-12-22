import React, { useState } from 'react';
import { PieChartOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        key: '1',
        path: 'tai-khoan/1',
        icon: <UserOutlined />,
        label: 'thông tin tài khoản',
    },
    {
        key: '2',
        path: 'quan-ly-đơn-hàng/2',
        icon: <PieChartOutlined />,
        label: 'Quản lý đơn hàng',
    },
    {
        key: '3',
        icon: <LockOutlined />,
        label: 'Đổi mật khẩu',
    },
];
const Personal = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, darkAlgorithm },
    } = theme.useToken();
    const handleClick = ({
        item: {
            props: { path },
        },
    }) => {
        navigate(`/cai-dat/${path}`);
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#efefef',
            }}
        >
            <Layout
                style={{
                    minHeight: '100vh',
                    width: '75%',
                    margin: 'auto',
                    borderRadius: '40px',
                }}
            >
                <Sider onCollapse={(value) => setCollapsed(value)} style={{ backgroundColor: '#efefef' }}>
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                            // background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <Avatar size={{ xs: 24, xl: 40 }} />
                    </div>
                    <Menu
                        style={{ backgroundColor: '#efefef' }}
                        defaultSelectedKeys={[id]}
                        mode="inline"
                        items={items}
                        onClick={handleClick}
                    />
                </Sider>
                <Layout className="site-layout" style={{ backgroundColor: '#efefef' }}>
                    <Header
                        style={{
                            padding: 0,
                            backgroundColor: '#efefef',
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 400,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Personal;
