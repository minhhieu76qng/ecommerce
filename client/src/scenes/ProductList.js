import React from 'react';
import PageBreadcrumb from '../components/breadcrumb';
import { Row, Col } from 'antd';
import Category from '../components/sidebar/Category';
import Filter from '../components/sidebar/Filter';

const ProductList = () => {
  return (
    <>
      <PageBreadcrumb />
      <Row gutter={20}>
        <Col span={4}>
          {/* sidebar */}
          <Category />
          <Filter />
        </Col>
        <Col span={20}>{/* products */}f</Col>
      </Row>
      {/* breadcumb */}
      {/* sidebar: category, filter */}
      {/* show products: sort, pagination */}
    </>
  );
};

export default ProductList;
