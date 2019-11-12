import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as OrderImg } from '../../../assets/imgs/orders.svg';
import { ReactComponent as OverviewImg } from '../../../assets/imgs/overview.svg';
import { ReactComponent as PaymentImg } from '../../../assets/imgs/payment.svg';
import { ReactComponent as ProductsImg } from '../../../assets/imgs/products.svg';
import { ReactComponent as PromotionImg } from '../../../assets/imgs/promotion.svg';
import { ReactComponent as SettingImg } from '../../../assets/imgs/setting.svg';
import './index.scss';

const SellerSidebar = () => {
  return (
    <ul id='nav_seller' style={{ margin: '0' }}>
      <li>
        <NavLink
          activeClassName='active'
          activeClassName='active'
          className='link'
          to='/seller/overview'>
          <OverviewImg className='icon' />
          Overview
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' className='link' to='/seller/orders'>
          <OrderImg className='icon' />
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName='active'
          className='link'
          to='/seller/products'>
          <ProductsImg className='icon' />
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName='active'
          className='link'
          to='/seller/payments'>
          <PaymentImg className='icon' />
          Payments
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName='active'
          className='link'
          to='/seller/promotions'>
          <PromotionImg className='icon' />
          Promotions
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' className='link' to='/seller/setting'>
          <SettingImg className='icon' />
          Setting
        </NavLink>
      </li>
    </ul>
  );
};

export default SellerSidebar;
