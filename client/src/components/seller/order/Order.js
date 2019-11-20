import React from 'react';
import { Select, Icon, Table, Tag } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';
import '../seller.scss';
import Paginatev2 from '../../pagination/Paginatev2';

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'order_id',
    key: 'order_id',
    width: '10%'
  },
  {
    title: 'Ordered date',
    dataIndex: 'ordered_date',
    key: 'ordered_date',
    width: '20%'
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
    width: '35%'
  },
  {
    title: 'Total ($)',
    dataIndex: 'total',
    key: 'total',
    width: '10%'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      switch (status) {
        case 'PENDING':
          return <Tag className='tag' style={{ backgroundColor: '#fbba4e' }}>Pending</Tag>
        case 'COMPLETED':
          return <Tag className='tag' style={{ backgroundColor: '#82bf11' }}>Completed</Tag>
        case 'CANCELED':
          return <Tag className='tag' style={{ backgroundColor: '#f05d62' }}>Canceled</Tag>
      }
    },
    width: '15%'
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (a) => {
      return (
        <div className='action-box'>
          <div className='action-title'>
            Actions <Icon type="caret-down" style={{ opacity: 0.6, marginLeft: 5 }} />
          </div>

          <ul className='action-menu'>
            <li>
              <button className='reset-button action-button'>
                <div className='circle' style={{ backgroundColor: 'var(--pea-green)' }}></div>Mark as Completed
              </button>
            </li>
            <li>
              <button className='reset-button action-button'>
                <div className='circle' style={{ backgroundColor: '#f05d62' }}></div>Mark as Canceled
              </button>
            </li>
          </ul>
        </div>
      )
    },
    width: '10%'
  },
];

const dataS = [{
  key: '1',
  order_id: '1',
  ordered_date: '1',
  detail: '1',
  total: '1',
  status: 'PENDING',
  action: '1',
},
{
  key: '1',
  order_id: '1',
  ordered_date: '1',
  detail: '1',
  total: '1',
  status: 'PENDING',
  action: '1',
}]


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Order = () => {

  let page = 1;
  let query = useQuery();
  if (query.get('page')) {
    page = +query.get('page');
  }


  return (
    <div className='order-page'>
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
          <Link className='btn-seller bg-white' to='/seller/products/export'>
            <Icon className='icon' type='download' /> Export
          </Link>
        </div>
      </div>

      <div className='product_table'>
        <Table className='table' size='small' columns={columns} dataSource={dataS} pagination={false}></Table>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px 20px' }}>
          <div>Show 1 to 10 of 123 entries</div>
          <div className='pagination'>
            <Paginatev2 totalPage={5} currentPage={page} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
