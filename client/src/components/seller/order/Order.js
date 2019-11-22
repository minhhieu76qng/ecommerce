import React, { useEffect, useState } from 'react';
import { Select, Icon, Table, Tag, message } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './index.scss';
import '../seller.scss';
import Paginatev2 from '../../pagination/Paginatev2';
import AuthAxios from '../../../utils/AuthAxios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Order = () => {

  const location = useLocation();
  const history = useHistory();

  const [orderList, setOrderList] = useState(null);
  const [totalOrders, setTotalOrders] = useState(1);
  const [isFetchingList, setIsFetchingList] = useState(false);
  const [limit, setLimit] = useState(10);

  let page = 1;
  let query = useQuery();
  if (query.get('page')) {
    page = +query.get('page');
  }

  let sort = 'all';
  if (query.get('sort')) {
    sort = query.get('sort');
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
      .catch(err => { })
      .finally(() => {
        setIsFetchingList(false);
      });
  }, [page, limit, sort]);

  // Table
  let dataSource = [];
  if (orderList) {
    dataSource = orderList.map(val => ({
      key: val._id,
      _id: val._id,
      order_id: val.orderId,
      ordered_date: val.orderedDate,
      detail: `${val.name} (${val.size.name}) x ${val.quantity}`,
      total: val.quantity * val.price,
      status: val.status,
      productId: val.productId,
    }));
  }

  const actionClick = (_id, status) => {
    // tim san pham hien tai
    const order = orderList.find(val => val._id === _id);

    if (!order) {
      return message.error('Order not found!');
    }

    if (order.status !== 'PENDING') {
      return message.error('Order is not pending!');
    }

    setIsFetchingList(false);
    AuthAxios.CreateInstance().patch(`/api/orders/${_id}`, { newStatus: status })
      .then(({ data: { _id, newStatus, success } }) => {
        // update lai state
        message.success(success.message);

        if (!orderList) {
          return;
        }
        const temp = [...orderList];
        for (let i = 0; i < temp.length; i++) {
          if (temp[i]._id === _id) {
            temp[i].status = newStatus;
            break;
          }
        }

        setOrderList(temp);
      })
      .catch(({ response: { data: { errors } } }) => {
        if (errors) {
          errors.map(val => {
            message.error(val.message);
          })
        }
      })
      .finally(() => {
        setIsFetchingList(false);
      })
  }

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
      dataIndex: '_id',
      key: 'action',
      render: (_id, order) => {
        return (
          <div className={`action-box ${order.status !== 'PENDING' ? 'disable' : ''}`}>
            <div className='action-title'>
              Actions{' '}
              <Icon type='caret-down' style={{ opacity: 0.6, marginLeft: 5 }} />
            </div>

            <ul className='action-menu'>
              <li>
                <button className='reset-button action-button' onClick={() => actionClick(_id, 'COMPLETED')}>
                  <div
                    className='circle'
                    style={{ backgroundColor: 'var(--pea-green)' }}></div>
                  Mark as Completed
                </button>
              </li>
              <li>
                <button className='reset-button action-button' onClick={() => actionClick(_id, 'CANCELED')}>
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

  const handleSortChange = value => {
    const query = location.search;
    let search_params = new URLSearchParams(location.search);

    if (!search_params.has('sort')) {
      search_params.append('sort', value);
    } else {
      search_params.set('sort', value);
    }

    const path =
      location.pathname.replace(query, '') + '?' + search_params.toString();
    history.push(path);
  };

  return (
    <div className='order-page'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='sort_by'>
          <span className='title'>Ordered date</span>
          <button onClick={() => handleSortChange('today')} className='btn-seller default' style={{ marginRight: 12 }}>Today</button>
          <button onClick={() => handleSortChange('yesterday')} className='btn-seller default'>Yesterday</button>
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
            <>
              <div>
                Show {limit * (page - 1) + 1} to{' '}
                {limit * page > totalOrders ? totalOrders : limit * page} of{' '}
                {totalOrders} entries
            </div>
              <div className='pagination' style={{ display: 'flex' }}>
                <Select defaultValue={limit} value={limit} style={{ width: 60, marginRight: 20 }} suffixIcon={<Icon type='caret-down' />} onChange={(value) => setLimit(value)}>
                  <Select.Option value={10}>10</Select.Option>
                  <Select.Option value={20}>20</Select.Option>
                  <Select.Option value={30}>30</Select.Option>
                </Select>

                <Paginatev2
                  totalItems={totalOrders}
                  itemsPerPage={limit}
                  currentPage={page}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
