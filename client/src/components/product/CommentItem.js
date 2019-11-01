import React from 'react';
import { Row, Col, Rate } from 'antd';
import './index.scss';

const CommentItem = () => {
  return (
    <li className='comment-item'>
      <Row gutter={20}>
        <Col span={4}>
          <div style={{ padding: 20 }}>
            <p className='name'>Hieu DO</p>
            <p className='date'>30 Jul</p>
          </div>
        </Col>
        <Col span={20}>
          <div className='wrapper'>
            <p className='title'>dhkh dsfh dkjf</p>
            <Rate defaultValue={2} style={{ marginBottom: 15 }} />
            <p className='comment'>hjfhgkfhkjgh</p>
          </div>
        </Col>
      </Row>
    </li>
  );
};

export default CommentItem;
