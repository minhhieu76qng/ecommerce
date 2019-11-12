import React from 'react';
import { Avatar, Dropdown, Icon, Menu, Badge, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.alipay.com/'>
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.alipay.com/'>
          1st menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: 'flex', marginTop: 25, alignItems: 'center' }}>
      <h3
        style={{
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: 0,
          flexGrow: 1,
          position: 'relative'
        }}>
        {title}
        {title === 'Add product' &&
          <Breadcrumb style={{ fontSize: 14, fontWeight: 500, color: 'var(--charcoal-grey)', position: 'absolute', bottom: '-25px' }}>
            <Breadcrumb.Item>
              <Link to='/seller/products'>Products</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/seller/products/add'>Add product</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      </h3>

      <div
        style={{
          maxWidth: 300,
          display: 'flex',
          justifyContent: 'space-around',
          flexGrow: 1,
        }}>
        <div className='seller_info'>
          <Avatar
            style={{
              marginRight: 10,
              boxShadow: '0 5px 20px 0 rgba(61, 61, 63, 0.2)',
            }}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHTMGS2N70uvcQ0A8S5X3iZbNyldpm5ymYml2_ZJn1wfomaBak'
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className='ant-dropdown-link'
              style={{ fontWeight: 700, color: 'var(--dark-gey)' }}
              href='#'>
              Lucile Bush <Icon type='down' />
            </a>
          </Dropdown>
        </div>

        <Badge count={'9+'}>
          <img src='/imgs/mail.svg' />
        </Badge>
        <Badge count={'9+'}>
          <img src='/imgs/notification.svg' />
        </Badge>
      </div>
    </div>
  );
};

export default Header;
