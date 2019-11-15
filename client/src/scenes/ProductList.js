import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Form } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import Filter from '../components/sidebar/Filter';
import ProductItem from '../components/product/ProductItem';
import PageBreadcrumbContainer from '../containers/PageBreadcrumbContainer';
import CategoryContainer from '../containers/CategoryContainer';
import Pagination from '../components/pagination/Pagination';
import Axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductList = () => {
  const { id: categoryID } = useParams();
  let page = 1;
  let query = useQuery();
  if (query.get('page')) {
    page = +query.get('page');
  }

  const [products, setProducts] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  // nếu thay đổi categoryID -> reset query
  // nếu thay đổi page thì vẫn giữ nguyên

  useEffect(() => {
    fetchProducts('');
  }, [categoryID, page]);

  const fetchProducts = (queryString) => {
    // chuyển đổi queryboject sang string. -. ghép vào link
    Axios.get(`/api/categories/${categoryID}/products?page=${page}${queryString}`)
      .then(response => {
        setProducts(response.data.list);
        setTotalPage(+response.data.totalPage);
        setCurrentPage(+response.data.currentPage);
      })
      .catch(err => {
        setProducts(null);
      });
  }

  const handleFilter = (queryString) => {
    fetchProducts(queryString);
  }

  return (
    <>
      <PageBreadcrumbContainer categoryID={categoryID} />
      <Row gutter={20}>
        <Col span={4}>
          <CategoryContainer />
          <Filter handleFilter={handleFilter} />
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

                {products && products.length !== 0 && (
                  <Pagination current={currentPage} total={totalPage} />
                )}
              </div>
            </Col>
          </Row>

          <div className='list-product' style={{ marginTop: 15 }}>
            {(!products || products.length === 0) && (
              <div
                style={{
                  color: 'var(--greyish-two)',
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                No result found
              </div>
            )}
            {products &&
              products.map(val => (
                <ProductItem
                  key={val._id}
                  _id={val._id}
                  name={val.name}
                  photo={val.photos[0]}
                  price={val.price}
                />
              ))}
          </div>

          <Row>
            <Col span={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}>
                {products && products.length !== 0 && (
                  <Pagination current={currentPage} total={totalPage} />
                )}
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
