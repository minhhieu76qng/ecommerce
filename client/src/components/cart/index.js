import React from 'react';
import CartItem from './CartItem';
import { Row, Col, Button, Divider } from 'antd';
import './index.scss';

const Cart = () => {
  return (
    <div id='cart'>
      <h3 className='title'>My Bag</h3>
      <Row className='table-product' gutter={20} style={{ marginTop: 30 }}>
        <Col span={16}>
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
        <Col span={1} />
        <Col span={7}>
          <div className='table-header'>Total</div>
          <div className='checkout-block'>
            <div className='row'>
              <p>Shipping &amp; Handling:</p>
              <p>Free</p>
            </div>
            <div className='row'>
              <p>Total product:</p>
              <p>$6.900</p>
            </div>
            <Divider />
            <div className='row' style={{ fontWeight: 700, fontSize: 16 }}>
              <p>Subtotal:</p>
              <p>$6.900</p>
            </div>
          </div>
          <Button block className='btn' type='danger' size='large' style={{ marginTop: 20 }}>Check out</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
