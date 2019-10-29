import React, { useState } from "react";
import { Badge, Button, Avatar, Dropdown, Menu, Row, Col } from "antd";
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

  const menuCart = (
    <Menu className='menu-cart'>
      <Menu.Item>
        <div className='product-in-cart'>
          <Row>
            <Col span={6}>
              <div className='product-img'>
                <img src='https://vn-test-11.slatic.net/p/ao-khoac-chong-nang-1721-1147282-817cf933e9cdb8344594c2c5eb7b024f-catalog.jpg_340x340q80.jpg_.webp' />
              </div>
            </Col>
            <Col span={18}>
              <div className='product-detail'>
                <a href='' className='title'>New Balance Men's Street Backpack</a>

                <div className='description'>
                  <div className='price'>$485</div>
                  <div>S&#8226; Black&#8226;1pcs</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Menu.Item>
      <button className='reset-button cart-button'>View cart</button>
    </Menu>
  )

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

        <Dropdown overlay={menuCart} trigger={['click']}>
          <Badge count={3} style={{ backgroundColor: '#ffa15f' }}>
            <button className="reset-button">
              <img src={searchIcon} />
            </button>
          </Badge>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopHeader;
