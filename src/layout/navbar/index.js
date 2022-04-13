import React from "react";
import { Layout } from 'antd';
import SideMenu from './SideMenu'
import "../../asset/css/Navbar.css";

const { Content } = Layout;
const RouteNav = ({ children }) => {

    return (
        <Layout style={{ minHeight: '100vh', paddingTop: '70px' }}>
            <SideMenu style={{ zIndex: '10', position: 'fixed' }} />
            <Layout className="site-layout" style={{ marginTop: '50px' }}>
                <Content style={{ margin: '0 16px' }} >
                    {children}
                </Content>
            </Layout>
        </Layout>

    )
}
export default RouteNav;
