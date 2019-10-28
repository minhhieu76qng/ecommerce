import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';

const NavBar = () => {
  const menu = (
    <ul className='sub-menu'>
      <li className='item'>
        <a href='#'>Tops</a>
      </li>
      <li className='item'>
        <a href='#'>Bottoms</a>
      </li>
      <li className='item'>
        <a href='#'>Dresses</a>
      </li>
      <li className='item'>
        <a href='#'>Jackets</a>
      </li>
    </ul>
  )
  return (
    <div className='nav-wrapper'>
      <nav>
        <ul className='main-nav'>
          <li>
            <Dropdown overlay={menu} placement='bottomCenter'>
              <a className="ant-dropdown-link menu-link" href="#">
                Mens<Icon className='icon-down' type="down" />
              </a>
            </Dropdown>
          </li>
          <li>
            <Dropdown overlay={menu} placement='bottomCenter'>
              <a className="ant-dropdown-link menu-link" href="#">
                Ladies<Icon className='icon-down' type="down" />
              </a>
            </Dropdown>
          </li>
          <li>
            <Dropdown overlay={menu} placement='bottomCenter'>
              <a className="ant-dropdown-link menu-link" href="#">
                Girls<Icon className='icon-down' type="down" />
              </a>
            </Dropdown>
          </li>
          <li>
            <Dropdown overlay={menu} placement='bottomCenter'>
              <a className="ant-dropdown-link menu-link" href="#">
                Boys<Icon className='icon-down' type="down" />
              </a>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;