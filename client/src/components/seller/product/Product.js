import React from 'react';
import { Row, Col, Select, Icon, Table } from 'antd';
import { Link } from 'react-router-dom';
import '../seller.scss';
import './index.scss';

const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: ({ picture, product_name, categories }) => {
      return <div></div>;
    },
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
  },
  {
    title: 'Date added',
    dataIndex: 'Date added',
    key: 'Date added',
  },
  {
    title: 'Profit ($)',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
  },
];

const Product = () => {
  return (
    <div className='view_products'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='sort_by'>
          <span className='title'>Sort by</span>
          <Select
            suffixIcon={<Icon type='caret-down' />}
            defaultValue='date'
            style={{ width: 150 }}>
            <Select.Option value='date'>Date added</Select.Option>
            <Select.Option value='az'>A - Z</Select.Option>
            <Select.Option value='za'>Z - A</Select.Option>
          </Select>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}
          className='product_widgets'>
          <form className='form_search' style={{ width: 280 }}>
            <input type='text' placeholder='Search product' />
            <button type='submit'>
              <Icon type='search' />
            </button>
          </form>
          <Link className='btn-seller bg-orange' to='/seller/products/add'>
            <Icon className='icon' type='plus' /> Add product
          </Link>
          <Link className='btn-seller bg-white' to='/seller/products/export'>
            <Icon className='icon' type='download' /> Export
          </Link>
        </div>
      </div>
      <div className='product_table'>
        <Table columns={columns} />
      </div>
    </div>
  );
};

export default Product;
