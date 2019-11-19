import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Skeleton } from 'antd';
import Axios from 'axios';

const AlsoLike = ({ productId }) => {
  const sketelon = [1, 2, 3, 4, 5, 6, 7, 8];

  const [isFetching, setIsFetching] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    Axios.get(`/api/products/${productId}/relatedproducts`)
      .then(({ data: { _id, products } }) => {
        const temp = products.filter(val => val._id !== _id);
        setRelatedProducts(temp);
      })
      .catch(err => {
        setRelatedProducts(null);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [productId]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Row type='flex' justify='center'>
        <Col span={20}>
          <h5 className='title'>You may also like</h5>
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: 20 }}>
        {isFetching &&
          sketelon.map(val => (
            <Col key={val} span={3}>
              <Card className='also-like' bordered={false} hoverable={true}>
                <Skeleton loading={true} active />
              </Card>
            </Col>
          ))}

        {!isFetching &&
          relatedProducts &&
          relatedProducts.map(val => (
            <Col span={3} key={val._id}>
              {val.photos.length > 0 && (
                <Link className='title' to={`/products/${val._id}`}>
                  <Card
                    className='also-like'
                    bordered={false}
                    hoverable={true}
                    cover={<img src={val.photos[0]} />}>
                    {val.name}
                  </Card>
                </Link>
              )}
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default AlsoLike;
