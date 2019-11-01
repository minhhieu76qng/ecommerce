import React from 'react';
import CommentItem from './CommentItem';
import { Row, Col } from 'antd';

const ProductReview = () => {
  return (
    <div className='review' style={{ overflow: 'hidden' }}>
      <Row type='flex' justify='center'>
        <Col span={20}>
          <h5 className='title'>Reviews</h5>
          <ul style={{ listStyleType: 'none' }}>
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ProductReview;
