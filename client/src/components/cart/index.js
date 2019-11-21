import React, { useEffect } from 'react';
import { Row, Col, Button, Divider, Spin, Skeleton, message, Popconfirm } from 'antd';
import './index.scss';
import CartItemContainer from '../../containers/CartItemContainer';
import AuthAxios from '../../utils/AuthAxios';

const Cart = ({ list, isFetching, fetchCart, setFetching }) => {
  useEffect(() => {
    fetchCart();
  }, []);

  let totalPrice = list.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0,
  );


  const handleCheckout = () => {

    if (!list || list.length === 0) {
      return message.error('Your cart is empty!');
    }

    setFetching(true);

    AuthAxios.CreateInstance().post('/api/orders')
      .then(({ data: { completedTask, failedTask } }) => {
        // hiển thị list sản phẩm thành công và thất bại
        message.success('Your order has been placed!')
      })
      .catch(({ response: { data: { errors } } }) => {
        errors.map(val => {
          message.error(val.message)
        })
      })
      .finally(() => {
        setFetching(true);
        fetchCart();
      })
  }

  return (
    <Spin spinning={isFetching}>
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
              {(!list || (list && list.length === 0)) && !isFetching && (
                <div style={{ marginTop: 30, textAlign: 'center' }}>
                  No products in cart.
                </div>
              )}
              {list &&
                list.map(product => {
                  return (
                    <CartItemContainer key={product._id} product={product} />
                  );
                })}
            </ul>
          </Col>
          <Col span={1} />
          <Col span={7}>
            {list && list.length !== 0 && (
              <>
                <Skeleton loading={isFetching}>
                  <div className='table-header'>Total</div>
                  <div className='checkout-block'>
                    <div className='row'>
                      <p>Shipping &amp; Handling:</p>
                      <p>Free</p>
                    </div>
                    <div className='row'>
                      <p>Total product:</p>
                      <p>${totalPrice}</p>
                    </div>
                    <Divider />
                    <div
                      className='row'
                      style={{ fontWeight: 700, fontSize: 16 }}>
                      <p>Subtotal:</p>
                      <p>${totalPrice}</p>
                    </div>
                  </div>
                </Skeleton>
                <Popconfirm
                  title="Are you sure check out these orders?"
                  onConfirm={handleCheckout}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    block
                    className='btn'
                    type='danger'
                    size='large'
                    style={{ marginTop: 20 }}
                  // onClick={handleCheckout}
                  >
                    Check out
                </Button>
                </Popconfirm>

              </>
            )}
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Cart;
