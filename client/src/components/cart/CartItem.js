import React from 'react';
import { Row, Col, Button, Divider } from 'antd';
import CustomInputNumber from '../input/CustomInputNumber';

const CartItem = () => {
  const handle = val => {
    console.log(val);
  };
  return (
    <li className='list-item'>
      <Row gutter={20} type='flex' align='middle'>
        <Col span={9}>
          <Row gutter={20} type='flex'>
            <Col span={8}>
              <img src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
            </Col>
            <Col
              span={16}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <div className='product-name'>
                Collete Stretch Linen Minidress
              </div>

              <div className='link'>
                <Button className='btn-link' type='link'>
                  Change
                </Button>
                <Divider type='vertical' />
                <Button className='btn-link' type='link'>
                  Remove
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={3} style={{ textAlign: 'center' }}>
          <Button
            className='btn-color'
            style={{
              backgroundColor: 'red',
              margin: 0,
              display: 'inline-block',
            }}></Button>
        </Col>
        <Col
          span={3}
          className='center'
          style={{ textAlign: 'center', color: '#202124' }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#202124' }}>
            S
          </span>
        </Col>
        <Col span={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomInputNumber passValue={handle} maxValue={10} />
          </div>
        </Col>
        <Col span={3} style={{ textAlign: 'center', color: '#202124' }}>
          $69.00
        </Col>
      </Row>
    </li>
  );
};

export default CartItem;
