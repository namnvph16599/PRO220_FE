import React, { useEffect, useState } from 'react';
import { PieChartOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        key: 'tai-khoan',
        path: 'tai-khoan',
        icon: <UserOutlined />,
        label: 'thông tin tài khoản',
    },
    {
        key: 'quan-ly-don-hang',
        path: 'quan-ly-don-hang',
        icon: <PieChartOutlined />,
        label: 'Quản lý đơn hàng',
    },
];
const Personal = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [something, setSomething] = useState('tai-khoan');
    const { pathname } = useLocation();
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
    useEffect(() => {
        const subString = pathname.substring(9);
        if (subString) {
            setSomething(subString);
        }
    }, [pathname]);

    return (
        <Layout
            style={{
                width: '100%',
                backgroundColor: '#efefef',
                padding: '20px 0px',
            }}
        >
            <Layout
                style={{
                    width: '75%',
                    margin: 'auto',
                    borderRadius: '40px',
                }}
            >
                <Sider
                    onCollapse={(value) => setCollapsed(value)}
                    style={{ backgroundColor: 'rgb(255, 255, 255)', minHeight: 550 }}
                >
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
                        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
                        defaultSelectedKeys={['tai-khoan']}
                        selectedKeys={[something]}
                        mode="inline"
                        items={items}
                        onClick={handleClick}
                    />
                </Sider>
                <Layout className="site-layout" style={{ backgroundColor: '#efefef' }}>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 550,
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
