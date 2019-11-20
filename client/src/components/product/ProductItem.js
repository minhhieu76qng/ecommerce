import React from 'react';
import { Card, message } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import short from 'short-uuid';
import AuthAxios from '../../utils/AuthAxios';

const ProductItem = ({ _id, name, price, photo, sizes, colors, fetchCart }) => {

  const addToCart = (event) => {
    event.preventDefault();
    AuthAxios.CreateInstance()
      .post('/api/cart/products', {
        _id: short().new(),
        productId: _id,
        color: colors[0],
        size: sizes[0],
        quantity: 1,
      })
      .then(({ data: { added } }) => {
        message.success('Add product to cart successfully!');
        fetchCart();
      })
      .catch(({ response: { data: { errors } } }) => {
        errors.map(val => {
          message.error(val.message);
        });
      });
  }

  return (
    <Link to={`/products/${_id}`}>
      <Card
        className='product-item'
        bordered={false}
        hoverable
        style={{ width: 180 }}
        cover={
          <div className='wrapper-img'>
            <img alt={name} src={photo} />
            <button className='reset-button add-cart' onClick={addToCart}>+ Quick Shop</button>
            <div className='sold-out'>Sold out</div>
          </div>
        }>
        <p className='product-title'>{name}</p>
        <div className='product-price'>${price}</div>
      </Card>
    </Link>
  );
};

export default ProductItem;
