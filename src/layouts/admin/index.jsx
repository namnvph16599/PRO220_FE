import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

const AdminLayout = () => {
    return (
        <Layout>
            <Sider></Sider>
            <Layout>
                <Header></Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
