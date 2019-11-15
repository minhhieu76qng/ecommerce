import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';

const ProductItem = ({ _id, name, price, photo }) => {
  return (
    <Card
      className='product-item'
      bordered={false}
      hoverable
      style={{ width: 180 }}
      cover={
        <div className='wrapper-img'>
          <img alt={name} src={photo} />
          <a className='add-cart' href='#'>
            + Quick Shop
          </a>
          <div className='sold-out'>Sold out</div>
        </div>
      }>
      <Link to={`/products/${_id}`} className='product-title'>
        {name}
      </Link>
      <div className='product-price'>${price}</div>
    </Card>
  );
};

export default ProductItem;
