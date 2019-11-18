import React, { useState, useEffect } from 'react';
import { Row, Col, Rate, Button, Divider, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CustomInputNumber from '../input/CustomInputNumber';
import Axios from 'axios';

const initialPurchasedObject = {
  size: null,
  color: null,
  quantity: null,
};

const ProductInfo = ({
  productId,
  sizes,
  colors,
  brands,
}) => {
  const [purchasedObject, setPurchasedObject] = useState(
    initialPurchasedObject,
  );

  const [isFetching, setIsFetching] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [productFromBrand, setProductFormBrand] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    Axios.get(`/api/products/${productId}`)
      .then(response => {
        const brandId = response.data.product.brand;

        Axios.get(`/api/brands/${brandId}/products`)
          .then(({ data: { products } }) => {
            const temp = products.filter(
              val => val._id !== response.data.product._id,
            );
            setProductFormBrand(temp);
          })
          .catch(err => { })
          .finally(() => {
            setIsFetching(false);
          });

        setProductInfo(response.data.product);
      })
      .catch(err => { });


  }, [productId]);


  // event
  const handleQuantityChange = value => {
    const temp = { ...purchasedObject };

    temp.quantity = value;

    setPurchasedObject(temp);
  };

  const handleColorClick = value => { };
  const handleSizeClick = value => { };


  // process data
  let brandName = '';

  if (productInfo && productInfo.brand) {
    brands.map(val => {
      if (val._id === productInfo.brand) {
        brandName = val.name;
      }
    });
  }

  return (
    <div className='product-detail'>
      <Row gutter={20}>
        <Spin spinning={isFetching}>
          <Col span={2}>
            {productInfo &&
              productInfo.photos &&
              productInfo.photos.map(imgSrc => (
                <div className='product-thumbnail'>
                  <img src={imgSrc} />
                </div>
              ))}
          </Col>
          <Col span={8}>
            {productInfo &&
              productInfo.photos &&
              productInfo.photos.length >= 1 && (
                <div className='product-image'>
                  <img src={productInfo.photos[0]} />
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
                              className={`btn-size ${
                                purchasedObject.size ? 'active' : ''
                                }`}
                              onClick={() => handleSizeClick(sizeDetails[0]._id)}>
                              {sizeDetails[0].name}
                            </Button>
                          );
                        } else {
                          return <></>;
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
                            <Button
                              className={`btn-color ${
                                purchasedObject.color ? 'active' : ''
                                }`}
                              style={{ background: `${value}` }}
                              onClick={() => handleColorClick(colorDetails[0]._id)}
                            />
                          );
                        } else {
                          return <></>;
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
                      />
                    )}
                  </div>
                </div>

                <Button className='field btn' size='large' block type='primary'>
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
                        <Link to={`/products/${val._id}`}>
                          <div className='product-thumbnail'>
                            <img src={val.photos[0]} />
                          </div>
                        </Link>
                      );
                    } else {
                      return <></>;
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
