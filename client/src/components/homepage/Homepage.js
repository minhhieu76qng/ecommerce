import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import './index.scss';

const Homepage = ({ categories: list }) => {

  return (
    <div className='homepage'>
      {/* main img */}
      <Row>
        <Col>
          <div className='main-img'>
            <div className='title'>Outfit of the week</div>
            <img src='https://www.fashiongonerogue.com/wp-content/uploads/2018/07/Bally-Fall-Winter-2018-Campaign03.jpg' />
            <button className='btn-shop'>Shop now</button>
          </div>
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: '20px' }}>
        {list &&
          list.map(item => (
            <Col span={6} key={uuidv1()}>
              <div className='box-img'>
                <img src={item.coverImg} />
                <div className='title'>{item.name}</div>
                <Link className='btn-shop' to={`/categories/${item._id}`}>
                  Shop now
                </Link>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Homepage;
