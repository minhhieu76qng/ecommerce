import React from 'react';
import { Row, Col, Button, Divider, Tooltip, message } from 'antd';
import CustomInputNumber from '../input/CustomInputNumber';
import AuthAxios from '../../utils/AuthAxios';

const CartItem = ({ product, sizes, colors, fetchCart }) => {
  const handleQuantityChange = val => {

    if (val > product.total) {
      return message.error('The quantity of products is not enough for your order!')
    }
    const temp = {
      _id: product._id,
      productId: product.productId,
      size: product.size,
      color: product.color,
      quantity: val,
    };

    // fetch api voi backend
    AuthAxios.CreateInstance()
      .patch(`/api/cart/products/${product._id}`, { product: temp })
      .then(({ data: { isUpdated } }) => {
        if (isUpdated) {
          message.success('Update successfully!');
        }
      })
      .catch(({ response: { data: { errors } } }) => {
        errors.map(val => {
          message.error(val.message);
        });
      })
      .finally(() => {
        // fetchCart de cap nhat
        fetchCart();
      });
  };

  const handleRemoveProduct = () => {
    AuthAxios.CreateInstance()
      .delete(`/api/cart/products/${product._id}`)
      .then(({ data: { isUpdated } }) => {
        if (isUpdated) {
          message.success('Remove product successfully!');
        }
      })
      .catch(({ response: { data: { errors } } }) => {
        if (errors) {
          errors.map(val => {
            message.error(val.message);
          });
        }
      })
      .finally(() => {
        fetchCart();
      });
  };

  let color = null;
  colors.map(colorItem => {
    if (colorItem._id === product.color) {
      color = colorItem;
    }
  });

  let size = null;
  sizes.map(sizeItem => {
    if (sizeItem._id === product.size) {
      size = sizeItem.name;
    }
  });

  return (
    <li className='list-item'>
      <Row gutter={20} type='flex' align='middle'>
        <Col span={9}>
          <Row gutter={20} type='flex'>
            <Col span={8}>
              <img src={product.photos[0]} />
            </Col>
            <Col
              span={16}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <div className='product-name'>{product.name}</div>

              <div className='link'>
                <Button className='btn-link' type='link'>
                  Change
                </Button>
                <Divider type='vertical' />
                <Button
                  className='btn-link'
                  type='link'
                  onClick={() => handleRemoveProduct(product._id)}>
                  Remove
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Tooltip title={color.name}>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Button
              className='btn-color'
              style={{
                backgroundColor: `${color.value}`,
                margin: 0,
                display: 'inline-block',
              }}
            />
          </Col>
        </Tooltip>
        <Col
          span={3}
          className='center'
          style={{ textAlign: 'center', color: '#202124' }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#202124' }}>
            {size}
          </span>
        </Col>
        <Col span={6}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomInputNumber
              passValue={handleQuantityChange}
              maxValue={product.total}
              defaultValue={product.quantity}
            />
          </div>
        </Col>
        <Col span={3} style={{ textAlign: 'center', color: '#202124' }}>
          ${product.price * product.quantity}
        </Col>
      </Row>
    </li>
  );
};

export default CartItem;
