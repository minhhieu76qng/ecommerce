import React from 'react';
import { Row, Col } from 'antd';
import './index.scss'

const Homepage = () => {
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
        <Col span={6}>
          <div className='box-img'>
            <img src='http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg' />
            <div className='title'>Men</div>
            <button className='btn-shop'>Shop now</button>
          </div>
        </Col>

        <Col span={6}>
          <div className='box-img'>
            <img src='http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg' />
            <div className='title'>Men</div>
            <button className='btn-shop'>Shop now</button>
          </div>
        </Col>

        <Col span={6}>
          <div className='box-img'>
            <img src='http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg' />
            <div className='title'>Men</div>
            <button className='btn-shop'>Shop now</button>
          </div>
        </Col>

        <Col span={6}>
          <div className='box-img'>
            <img src='http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg' />
            <div className='title'>Men</div>
            <button className='btn-shop'>Shop now</button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;