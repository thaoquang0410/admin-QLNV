import React, { useState } from "react";
import "../../asset/css/Navbar.css";
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
    UserOutlined,
    HomeOutlined,
    PullRequestOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const SideMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const onCollapse = (Collapsed) => {
        setCollapsed(Collapsed);
    };
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme={"light"}>
            <Menu theme="light" defaultSelectedKeys={[location.pathname]} mode="inline" >
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <span>Home</span>
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="/users" icon={<UserOutlined />}>
                    <span>User</span>
                    <Link to="/users" />
                </Menu.Item>
                <Menu.Item key="/requests" icon={<PullRequestOutlined />}>
                    <span>Request</span>
                    <Link to="/requests" />
                </Menu.Item>
                <Menu.Item key="/categories" icon={<MenuFoldOutlined />}>
                    <span>Category</span>
                    <Link to="/categories" />
                </Menu.Item>
                <Menu.Item key="/departments" icon={<PullRequestOutlined />}>
                    <span>Department</span>
                    <Link to="/departments" />
                </Menu.Item>
            </Menu>
        </Sider>
    )
}


export default SideMenu;