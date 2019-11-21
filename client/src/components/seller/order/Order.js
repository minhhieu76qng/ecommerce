import React, { useEffect, useState } from 'react';
import { Select, Icon, Table, Tag } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';
import '../seller.scss';
import Paginatev2 from '../../pagination/Paginatev2';
import AuthAxios from '../../../utils/AuthAxios';

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'order_id',
    key: 'order_id',
    width: '10%',
  },
  {
    title: 'Ordered date',
    dataIndex: 'ordered_date',
    key: 'ordered_date',
    width: '20%',
    render: value => {
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const current = new Date();
      const orderedDate = new Date(value);
      const isToday =
        current.getFullYear() === orderedDate.getFullYear() &&
        current.getMonth() === orderedDate.getMonth() &&
        current.getDate() === orderedDate.getDate();

      const weekDay = isToday ? 'Today' : weekdays[orderedDate.getDay()];

      const month = orderedDate.toLocaleString('default', { month: 'short' });
      const year = orderedDate.getFullYear();
      const date = orderedDate.getDate();

      let dateStr = '';
      switch (date) {
        case 1:
          dateStr = date + 'st';
          break;
        case 2:
          dateStr = date + 'nd';
          break;
        case 3:
          dateStr = date + 'rd';
          break;
        default:
          dateStr = date + 'th';
          break;
      }
      return `${weekDay}, ${dateStr} ${month}, ${year}`;
    },
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
    width: '35%',
  },
  {
    title: 'Total ($)',
    dataIndex: 'total',
    key: 'total',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      switch (status) {
        case 'PENDING':
          return (
            <Tag className='tag' style={{ backgroundColor: '#fbba4e' }}>
              Pending
            </Tag>
          );
        case 'COMPLETED':
          return (
            <Tag className='tag' style={{ backgroundColor: '#82bf11' }}>
              Completed
            </Tag>
          );
        case 'CANCELED':
          return (
            <Tag className='tag' style={{ backgroundColor: '#f05d62' }}>
              Canceled
            </Tag>
          );
      }
    },
    width: '15%',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: a => {
      return (
        <div className='action-box'>
          <div className='action-title'>
            Actions{' '}
            <Icon type='caret-down' style={{ opacity: 0.6, marginLeft: 5 }} />
          </div>

          <ul className='action-menu'>
            <li>
              <button className='reset-button action-button'>
                <div
                  className='circle'
                  style={{ backgroundColor: 'var(--pea-green)' }}></div>
                Mark as Completed
              </button>
            </li>
            <li>
              <button className='reset-button action-button'>
                <div
                  className='circle'
                  style={{ backgroundColor: '#f05d62' }}></div>
                Mark as Canceled
              </button>
            </li>
          </ul>
        </div>
      );
    },
    width: '10%',
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Order = () => {
  const [orderList, setOrderList] = useState(null);
  const [totalOrders, setTotalOrders] = useState(1);
  const [isFetchingList, setIsFetchingList] = useState(false);
  const [limit, setLimit] = useState(10);

  const [sort, setSort] = useState('date');

  let page = 1;
  let query = useQuery();
  if (query.get('page')) {
    page = +query.get('page');
  }

  // Table
  let dataSource = [];
  if (orderList) {
    dataSource = orderList.map(val => ({
      key: val.orderId,
      order_id: val.orderId,
      ordered_date: val.orderedDate,
      detail: `${val.name} (${val.size.name}) x ${val.quantity}`,
      total: val.quantity * val.price,
      status: val.status,
      productId: val.productId,
    }));
  }

  // fetch api để get danh sách các order
  useEffect(() => {
    setIsFetchingList(true);
    AuthAxios.CreateInstance()
      .get(`/api/orders?page=${page}&limit=${limit}&sort=${sort}`)
      .then(({ data: { orders, totalOrders } }) => {
        setOrderList(orders);
        setTotalOrders(totalOrders);
      })
      .catch(err => {})
      .finally(() => {
        setIsFetchingList(false);
      });
  }, [page, limit, sort]);

  const handleSortChange = value => {
    setSort(value);
  };

  return (
    <div className='order-page'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='sort_by'>
          <span className='title'>Sort by</span>
          <Select
            suffixIcon={<Icon type='caret-down' />}
            defaultValue='date'
            style={{ width: 150 }}
            onChange={handleSortChange}>
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
        <Table
          className='table'
          size='small'
          loading={isFetchingList}
          columns={columns}
          dataSource={dataSource}
          pagination={false}></Table>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '30px 20px',
          }}>
          {orderList && orderList.length > 0 && (
            <div>
              Show {limit * (page - 1) + 1} to{' '}
              {limit * page > totalOrders ? totalOrders : limit * page} of{' '}
              {totalOrders} entries
            </div>
          )}
          <div className='pagination'>
            {totalOrders > limit && (
              <Paginatev2
                totalItems={totalOrders}
                itemsPerPage={limit}
                currentPage={page}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
