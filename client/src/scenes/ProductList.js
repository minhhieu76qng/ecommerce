import React from 'react';
import { Row, Col, Select, Form, Pagination } from 'antd';
import { useParams } from 'react-router-dom';
import Filter from '../components/sidebar/Filter';
import ProductItem from '../components/product/ProductItem';
import PageBreadcrumbContainer from '../containers/PageBreadcrumbContainer';
import CategoryContainer from '../containers/CategoryContainer';

const ProductList = () => {
  const { id: categoryID } = useParams();

  return (
    <>
      <PageBreadcrumbContainer categoryID={categoryID} />
      <Row gutter={20}>
        <Col span={4}>
          <CategoryContainer />
          <Filter />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={24}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form>
                  <Select defaultValue='1' style={{ width: 179 }}>
                    <Select.Option value='1'>Popularity</Select.Option>
                    <Select.Option value='2'>Name: A - Z</Select.Option>
                    <Select.Option value='3'>
                      Price: Lowest to highest
                    </Select.Option>
                    <Select.Option value='4'>
                      Price: Highest to lowest
                    </Select.Option>
                  </Select>
                </Form>

                <Pagination simple defaultCurrent={2} total={50} />
              </div>
            </Col>
          </Row>

          <div className='list-product' style={{ marginTop: 15 }}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>

          <Row>
            <Col span={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}>
                <Pagination simple defaultCurrent={2} total={50} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* breadcumb */}
      {/* sidebar: category, filter */}
      {/* show products: sort, pagination */}
    </>
  );
};

export default ProductList;
