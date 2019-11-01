import React from 'react';
import CartItem from './CartItem';
import { Row, Col } from 'antd';
import './index.scss';

const Cart = () => {
  return (
    <div id='cart'>
      <h3 className='title'>My Bag</h3>
      <Row className='table-product' gutter={20} style={{ marginTop: 30 }}>
        <Col span={17}>
          <Row className='table-header' gutter={20}>
            <Col span={9}>Product</Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              Color
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              Size
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              Quantity
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              Amount
            </Col>
          </Row>
          <ul className='list' style={{ listStyleType: 'none' }}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </ul>
        </Col>
        <Col span={7}>f</Col>
      </Row>
    </div>
  );
};

export default Cart;
