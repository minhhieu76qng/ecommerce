import React, { useState, useEffect } from 'react';
import { Row, Col, Rate, Button, Divider, Spin, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import short from 'short-uuid';
import uuidv1 from 'uuid/v1';
import CustomInputNumber from '../input/CustomInputNumber';

import AuthAxios from '../../utils/AuthAxios';

const initialPurchasedObject = {
  size: null,
  color: null,
  quantity: 1,
};

const ProductInfo = ({ productId, sizes, colors, brands, fetchCart }) => {
  const [purchasedObject, setPurchasedObject] = useState(
    initialPurchasedObject,
  );

  const [isFetching, setIsFetching] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [productFromBrand, setProductFormBrand] = useState([]);

  const [mainPicture, setMainPicture] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    Axios.get(`/api/products/${productId}`)
      .then(({ data: { product: mainProduct } }) => {
        if (mainProduct.photos && mainProduct.photos.length > 0) {
          setMainPicture(mainProduct.photos[0]);
        }

        setProductInfo(mainProduct);

        // set default cart
        const tempPurchasedObject = {
          size:
            mainProduct.sizes && mainProduct.sizes.length > 0
              ? mainProduct.sizes[0]
              : null,
          color:
            mainProduct.colors && mainProduct.colors.length > 0
              ? mainProduct.colors[0]
              : null,
          quantity: 1,
        };

        setPurchasedObject(tempPurchasedObject);

        const brandId = mainProduct.brand;

        Axios.get(`/api/brands/${brandId}/products`)
          .then(({ data: { products } }) => {
            const temp = products.filter(val => val._id !== mainProduct._id);
            setProductFormBrand(temp);
          })
          .catch(err => { })
          .finally(() => {
            setIsFetching(false);
          });
      })
      .catch(err => { });
  }, [productId]);

  // event
  const handleQuantityChange = value => {
    const temp = { ...purchasedObject };

    temp.quantity = value;

    setPurchasedObject(temp);
  };

  const handleHover = imgSrc => {
    if (mainPicture !== imgSrc) {
      setMainPicture(imgSrc);
    }
  };

  const handleColorClick = value => {
    const temp = { ...purchasedObject };

    temp.color = value;

    setPurchasedObject(temp);
  };
  const handleSizeClick = value => {
    const temp = { ...purchasedObject };

    temp.size = value;

    setPurchasedObject(temp);
  };

  const addProductToCart = () => {
    if (productInfo.quantity === 0) {
      return message.error('This product is out of stock now!');
    }
    if (purchasedObject.quantity > productInfo.quantity) {
      return message.error('Your quantity must be less then product quantity!');
    }

    AuthAxios.CreateInstance()
      .post('/api/cart/products', {
        _id: short().new(),
        productId: productId,
        color: purchasedObject.color,
        size: purchasedObject.size,
        quantity: purchasedObject.quantity,
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

    // goi api. -> luu vao trong cart
  };

  // process data
  let brandName = '';

  if (productInfo && productInfo.brand) {
    brands.map(val => {
      if (val._id === productInfo.brand) {
        brandName = val.name;
      }
    });
  }

  console.log(productInfo);

  return (
    <div className='product-detail'>
      <Row gutter={20}>
        <Spin spinning={isFetching}>
          <Col span={2}>
            {productInfo &&
              productInfo.photos &&
              productInfo.photos.map(imgSrc => (
                <div
                  key={uuidv1()}
                  className='product-thumbnail'
                  onMouseEnter={() => handleHover(imgSrc)}>
                  <img src={imgSrc} />
                </div>
              ))}
          </Col>
          <Col span={8}>
            {productInfo && mainPicture && (
              <div className='product-image'>
                <img src={mainPicture} />
              </div>
            )}
          </Col>
          <Col span={1} />
          <Col span={9}>
            <div className='product-info'>
              {productInfo && productInfo.name && (
                <h3 className='product-title'>{productInfo.name}</h3>
              )}
              {productInfo && productInfo.price >= 0 && (
                <p className='product-price'>${productInfo.price}</p>
              )}
              <div>
                <Rate /> <Divider type='vertical' />{' '}
                <span style={{ fontSize: 12 }}>O Reviews</span>
              </div>

              <div className='order-box'>
                <div className='product-size field'>
                  <div className='header'>Size</div>
                  <div>
                    {productInfo &&
                      productInfo.sizes &&
                      productInfo.sizes.map(sizeId => {
                        const sizeDetails = sizes.filter(
                          val => val._id === sizeId,
                        );
                        if (sizeDetails.length > 0) {
                          return (
                            <Button
                              key={sizeId}
                              className={`btn-size ${
                                purchasedObject.size &&
                                  purchasedObject.size === sizeDetails[0]._id
                                  ? 'active'
                                  : ''
                                }`}
                              onClick={() =>
                                handleSizeClick(sizeDetails[0]._id)
                              }>
                              {sizeDetails[0].name}
                            </Button>
                          );
                        }
                      })}
                  </div>
                </div>
                <div className='product-color field'>
                  <div className='header'>Color</div>
                  <div>
                    {productInfo &&
                      productInfo.colors &&
                      productInfo.colors.map(colorId => {
                        const colorDetails = colors.filter(
                          val => val._id === colorId,
                        );
                        if (colorDetails.length > 0) {
                          const value = colorDetails[0].value;
                          return (
                            <Tooltip key={colorId} title={colorDetails[0].name}>
                              <Button
                                className={`btn-color ${
                                  purchasedObject.color &&
                                    purchasedObject.color === colorDetails[0]._id
                                    ? 'active'
                                    : ''
                                  }`}
                                style={{ background: `${value}` }}
                                onClick={() =>
                                  handleColorClick(colorDetails[0]._id)
                                }
                              />
                            </Tooltip>
                          );
                        }
                      })}
                  </div>
                </div>
                <div className='product-quantity field'>
                  <div className='header'>Quantity</div>
                  <div>
                    {productInfo && productInfo.quantity >= 0 && (
                      <CustomInputNumber
                        passValue={handleQuantityChange}
                        maxValue={productInfo.quantity}
                        defaultValue={1}
                      />
                    )}
                  </div>
                </div>

                <Button
                  className='field btn'
                  size='large'
                  block
                  type='primary'
                  onClick={addProductToCart}>
                  Add to cart
                </Button>
              </div>

              <div className='description' style={{ whiteSpace: 'pre-line' }}>
                {productInfo &&
                  productInfo.description &&
                  productInfo.description}
              </div>
            </div>
          </Col>
          <Col span={2} />
          <Col span={2}>
            <div className='more-from'>
              More from
              <div className='brand'>{brandName}</div>
              <div className='list-products'>
                {productFromBrand &&
                  productFromBrand.map(val => {
                    if (val.photos.length > 0) {
                      return (
                        <Link key={val._id} to={`/products/${val._id}`}>
                          <div className='product-thumbnail'>
                            <img src={val.photos[0]} />
                          </div>
                        </Link>
                      );
                    }
                  })}
              </div>
            </div>
          </Col>
        </Spin>
      </Row>
    </div>
  );
};

export default ProductInfo;
