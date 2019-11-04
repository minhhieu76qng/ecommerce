import React from 'react';
import { Badge, Avatar, Dropdown, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import searchIcon from './img/cart.svg';

const TopHeader = ({ openLogin, openRegister }) => {
  const menu = (
    <Menu className='menu-account'>
      <Menu.Item key='0'>
        <Link to='/account'>Account setting</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='1'>
        <Link to='/logout'>Logout</Link>
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
                <Link to='/product' className='title'>
                  New Balance Men's Street Backpack
                </Link>

                <div className='description'>
                  <div className='price'>$485</div>
                  <div>S&#8226; Black&#8226;1pcs</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Menu.Item>
      <Menu.Item>
        <Link to='/cart' className='reset-button cart-button'>
          View cart
      </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='top-header'>
      <form id='form-search'>
        <input type='text' name='search' placeholder='Search' />
        <button className='icon'>
          <i className='fa fa-search' aria-hidden='true'></i>
        </button>
      </form>

      <Link to='/'>
        <img src='/imgs/logo.svg' className='Logo' />
      </Link>

      <div className='widgets'>
        <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
          <a className='ant-dropdown-link' href='#'>
            <Avatar size={35} icon='user' />
          </a>
        </Dropdown>

        {/* <Link to="/register">Register</Link> */}
        <a
          onClick={e => {
            e.preventDefault();
            openRegister();
          }}
          href='/register'>
          Register
        </a>
        <a
          onClick={e => {
            e.preventDefault();
            openLogin();
          }}
          href='/login'
          className='round-button'>
          Log In
        </a>

        <Dropdown overlay={menuCart} trigger={['click']}>
          <Badge count={3} style={{ backgroundColor: '#ffa15f' }}>
            <button className='reset-button'>
              <img src={searchIcon} />
            </button>
          </Badge>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopHeader;
