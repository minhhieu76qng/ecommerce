import React from 'react';
import { Card } from 'antd';
import './index.scss';

const ProductItem = () => {
  return (
    <Card
      className='product-item'
      bordered={false}
      hoverable
      style={{ width: 180 }}
      cover={
        <div className='wrapper-img'>
          <img
            alt='example'
            src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
          />
          <a className='add-cart' href='#'>
            + Quick Shop
          </a>
          <div className='sold-out'>Sold out</div>
        </div>
      }>
      <a href='#' className='product-title'>
        Collete Stretch Linen Minidress
      </a>
      <div className='product-price'>$60</div>
    </Card>
  );
};

export default ProductItem;
