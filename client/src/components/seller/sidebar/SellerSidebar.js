import React from 'react';
import { Link } from 'react-router-dom';

const SellerSidebar = () => {
  return (
    <ul>
      <li>
        <Link to='/seller/overview'>
          <img src='/imgs/overview.svg' />
          Overview
        </Link>
      </li>
    </ul>
  );
};

export default SellerSidebar;