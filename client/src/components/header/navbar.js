import React, { useEffect } from 'react';
import { Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import uuidv1 from 'uuid/v1';

const renderSubmenu = subMenu => {
  if (!subMenu || subMenu.length === 0) {
    return <></>;
  }

  return (
    <ul className='sub-menu'>
      {subMenu &&
        subMenu.map(item => (
          <li className='item' key={uuidv1()}>
            <Link to={`/categories/${item.id}`}>{item.name}</Link>
          </li>
        ))}
    </ul>
  );
};

const NavBar = ({ navBarMenu: list, fetchMenu }) => {
  // component did mount
  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <div className='nav-wrapper'>
      <nav>
        <ul className='main-nav'>
          {list &&
            list.map(item => {
              return (
                <li key={uuidv1()}>
                  <Dropdown
                    overlay={renderSubmenu(item.childs)}
                    placement='bottomCenter'>
                    <Link to={`/categories/${item.id}`} className='menu-link'>
                      {item.name}
                      <Icon className='icon-down' type='down' />
                    </Link>
                  </Dropdown>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
