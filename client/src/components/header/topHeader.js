import React from "react";
import { Badge, Button, Avatar, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import searchIcon from "./img/cart.svg";

const TopHeader = () => {
  const menu = (
    <Menu className="menu-account">
      <Menu.Item key="0">
        <a href="/account">Account setting</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="top-header">
      <form id="form-search">
        <input type="text" name="search" placeholder="Search" />
        <button className="icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>

      <a href="/">
        <img src="/imgs/logo.svg" className="Logo" />
      </a>

      <div className="widgets">
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <a className="ant-dropdown-link" href="#">
            <Avatar size={35} icon="user" />
          </a>
        </Dropdown>

        {/* <Link to="/register">Register</Link> */}
        <a href="/register">Register</a>
        <a href="/login" className="round-button">
          Log In
        </a>
        <Badge count={3} style={{ backgroundColor: '#ffa15f' }}>
          <button className="reset-button">
            <img src={searchIcon} />
          </button>
        </Badge>
      </div>
    </div>
  );
};

export default TopHeader;
