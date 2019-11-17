import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Spin } from 'antd';
import { useParams, useLocation, useHistory } from 'react-router-dom';
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

  const location = useLocation();
  const history = useHistory();

  const { id: categoryID } = useParams();
  let page = 1;
  let query = useQuery();
  if (query.get('page')) {
    page = +query.get('page');
  }

  let sort = 'popularity';
  if (query.get('sort')) {
    sort = query.get('sort');
  }

  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  // nếu thay đổi categoryID -> reset query
  // nếu thay đổi page thì vẫn giữ nguyên

  useEffect(() => {
    fetchProducts('');
  }, [categoryID, page, sort]);

  const fetchProducts = (queryString) => {
    // chuyển đổi queryboject sang string. -. ghép vào link
    setIsFetching(true);
    Axios.get(`/api/categories/${categoryID}/products?page=${page}&sort=${sort}${queryString}`)
      .then(response => {
        setProducts(response.data.list);
        setTotalPage(+response.data.totalPage);
        setCurrentPage(+response.data.currentPage);
      })
      .catch(err => {
        setProducts(null);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  const handleFilter = (queryString) => {
    fetchProducts(queryString);
  }

  const handleSort = (value) => {
    const query = location.search;
    let search_params = new URLSearchParams(location.search);

    if (!search_params.has('sort')) {
      search_params.append('sort', value);
    } else {
      search_params.set('sort', value);
    }

    const path = location.pathname.replace(query, '') + '?' + search_params.toString();
    history.push(path);
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
                <Select defaultValue={sort} style={{ width: 179 }} onChange={handleSort}>
                  <Select.Option value='popularity'>Popularity</Select.Option>
                  <Select.Option value='nameAZ'>Name: A - Z</Select.Option>
                  <Select.Option value='lowest'>
                    Price: Lowest to highest
                    </Select.Option>
                  <Select.Option value='highest'>
                    Price: Highest to lowest
                    </Select.Option>
                </Select>

                {products && products.length !== 0 && (
                  <Pagination current={currentPage} total={totalPage} />
                )}
              </div>
            </Col>
          </Row>

          <div className='list-product' style={{ marginTop: 15 }}>
            <Spin spinning={isFetching} delay={500}>
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
            </Spin>
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
