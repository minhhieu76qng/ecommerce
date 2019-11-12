import React from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/seller/sidebar/SellerSidebar';
import Header from '../components/seller/header/Header';

const SellerLayout = ({ children }) => {
  return (
    <div
      className='seller_layout'
      style={{
        backgroundColor: 'var(--white-two)',
        minHeight: window.innerHeight,
        display: 'flex',
      }}>
      <div
        className='sidebar'
        style={{ width: 220, boxShadow: '1px 0 0 0 var(--white-three)' }}>
        <div>
          <Link
            to='/seller'
            style={{
              display: 'block',
              padding: '30px 0',
              textAlign: 'center',
            }}>
            <img
              src='/imgs/logo.svg'
              alt='logo'
              style={{ display: 'inline-block' }}
            />
          </Link>
        </div>
        <SellerSidebar />
      </div>
      <div style={{ flexGrow: 1, padding: '0 20px' }}>
        <Header />
        <div style={{ marginTop: 30 }}>{children}</div>
      </div>
    </div>
  );
};

export default SellerLayout;
