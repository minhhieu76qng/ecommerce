import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const PageBreadcrumb = () => {
  return (
    <div
      className='page-breadcum'
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0 30px 0',
      }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/category/hsjdfh'>jkshdf sg f</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/category/8497293'>jkshdf sg f</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/category/hjh235'>jkshdf sg f</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
