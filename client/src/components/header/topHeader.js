import React, { useEffect } from 'react';
import { Badge, Avatar, Dropdown, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import searchIcon from './img/cart.svg';
import { UserToken } from '../../utils/LocalStorage';
const userToken = new UserToken();

const TopHeader = ({ user, cart, sizes, colors, fetchCart, openLogin, openRegister, logOut }) => {
  const handleLogOut = () => {
    userToken.removeToken();
    logOut();
  };

  useEffect(() => {
    fetchCart();
  }, [])

  const menu = (
    <Menu className='menu-account'>
      <Menu.Item key='0'>
        <Link to='/account'>Account setting</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='1'>
        <Link to='/' onClick={handleLogOut}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  const menuCart = (
    <Menu className='menu-cart'>

      {cart && cart.map(productItem => {

        let color = null;
        colors.map(colorItem => {
          if (colorItem._id === productItem.color) {
            color = colorItem.name;
          }
        })

        let size = null;
        sizes.map(sizeItem => {
          if (sizeItem._id === productItem.size) {
            size = sizeItem.name;
          }
        })

        return (
          <Menu.Item key={productItem._id}>
            <Link to={`/products/${productItem._id}`}>
              <div className='product-in-cart'>
                <Row>
                  <Col span={6}>
                    <div className='product-img'>
                      <img src={productItem.photos[0]} />
                    </div>
                  </Col>
                  <Col span={18}>
                    <div className='product-detail'>
                      <p className='title'>{productItem.name}</p>

                      <div className='description'>
                        <div className='price'>${productItem.price}</div>
                        <div>{size}&#8226; {color}&#8226;1pcs</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Link>
          </Menu.Item>
        )
      })}

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
        {user && (
          <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
            <a className='ant-dropdown-link' href='#'>
              {user && user.avatar ? (
                <Avatar size={35} icon='home' />
              ) : (
                  <Avatar size={35} icon='user' />
                )}
            </a>
          </Dropdown>
        )}

        {!user && (
          <a
            onClick={e => {
              e.preventDefault();
              openRegister();
            }}
            href='/register'>
            Register
          </a>
        )}
        {!user && (
          <a
            onClick={e => {
              e.preventDefault();
              openLogin();
            }}
            href='/login'
            className='round-button'>
            Log In
          </a>
        )}

        <Dropdown overlay={menuCart} trigger={['click']}>
          <Badge count={cart && cart.length >= 0 ? cart.length : 0} style={{ backgroundColor: '#ffa15f' }}>
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
