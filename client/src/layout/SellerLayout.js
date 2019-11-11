import React from 'react';
import { Row } from 'antd';
import SellerSidebar from '../components/seller/sidebar/SellerSidebar';

const SellerLayout = ({ children }) => {
  return (
    <div className='seller_layout'>
      <div className='sidebar'>
        <SellerSidebar />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
};

export default SellerLayout;
