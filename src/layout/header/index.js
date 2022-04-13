import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import "../../asset/css/Header.css";
import logo from "../../asset/images/hblab-logo.png";
import { useHistory } from "react-router-dom";
import { clearToken } from "./../../helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/login";
import { toast } from "react-toastify";
import { TIME_CLOSE } from "../../config/constants";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.common.account);
  function handleMenuClick(item) {
    if (item.key === "2") {
      dispatch(logout(onSuccess));
    }
  }

  const onSuccess = (message) =>{
    clearToken();
    toast.warn(message,{autoClose: TIME_CLOSE});
    history.push("/login");
  }
  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{ width: "150%", marginRight: "10%", left: -50, top: 5 }}
    >
      <Menu.Item key="1" icon={<UserOutlined />}>
        <span style={{ color: "blue" }}>My info</span>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <span style={{ color: "red" }}>Log out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <img src={logo} className="header-images" alt="logo" />
      <div className="avatar">
        <Avatar icon={<UserOutlined />} />
        <div className="profile_avatar">
          <div>{account.name}</div>
          <div>{account.email}</div>
        </div>
        <Dropdown overlay={menu}>
          <DownOutlined />
        </Dropdown>
      </div>
    </div>
  );
}
