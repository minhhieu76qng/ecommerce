import React from 'react';
import { Row, Col, Rate, Button, Divider, InputNumber } from 'antd';
import CustomInputNumber from '../input/CustomInputNumber';

const ProductInfo = () => {
  return (
    <div className='product-detail'>
      <Row gutter={20}>
        <Col span={2}>
          <div className='product-thumbnail'>
            <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
          </div>
          <div className='product-thumbnail'>
            <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
          </div>
          <div className='product-thumbnail'>
            <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
          </div>
          <div className='product-thumbnail'>
            <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
          </div>
        </Col>
        <Col span={8}>
          <div className='product-image'>
            <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
          </div>
        </Col>
        <Col span={1} />
        <Col span={9}>
          <div className='product-info'>
            <h3 className='product-title'>Collete Stretch Linen Minidress</h3>
            <p className='product-price'>$69.00</p>
            <div>
              <Rate /> <Divider type='vertical' />{' '}
              <span style={{ fontSize: 12 }}>O Reviews</span>
            </div>

            <div className='order-box'>
              <div className='product-size field'>
                <div className='header'>Size</div>
                <div>
                  <Button className='btn-size'>S</Button>
                  <Button className='btn-size'>M</Button>
                  <Button className='btn-size'>L</Button>
                </div>
              </div>
              <div className='product-color field'>
                <div className='header'>Color</div>
                <div>
                  <Button
                    className='btn-color active'
                    style={{ background: '#ff5f6d' }}></Button>
                  <Button
                    className='btn-color'
                    style={{ background: 'rgba(255, 213, 67, 0.4)' }}></Button>
                  <Button
                    className='btn-color'
                    style={{ background: 'rgba(95, 109, 255, 0.4)' }}></Button>
                  <Button
                    className='btn-color'
                    style={{ background: 'rgba(255, 161, 95, 0.4)' }}></Button>
                  <Button
                    className='btn-color'
                    style={{ background: 'rgba(61, 61, 63, 0.4)' }}></Button>
                </div>
              </div>
              <div className='product-quantity field'>
                <div className='header'>Quantity</div>
                <div>
                  <CustomInputNumber maxValue={10} />
                </div>
              </div>

              <Button className='field btn' size='large' block type='primary'>
                Add to cart
              </Button>
            </div>

            <div className='description'>
              <div className='title'>Model wearing size S</div>
              <div>- Chest: 36”</div>
              <div>- Length: 25.75”</div>
            </div>
          </div>
        </Col>
        <Col span={2} />
        <Col span={2}>
          <div className='more-from'>
            More from
            <div className='brand'>Zara</div>
            <div className='list-products'>
              <div className='product-thumbnail'>
                <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
              </div>
              <div className='product-thumbnail'>
                <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
              </div>
              <div className='product-thumbnail'>
                <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-clothes-for-men-1570810869.jpg?crop=0.493xw:0.987xh;0,0.0130xh&resize=640:*' />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductInfo;
