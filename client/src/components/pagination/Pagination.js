import React from 'react';
import { Icon } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ current, total }) => {
  const location = useLocation();
  const next = current < total ? current + 1 : total;
  const prev = current > 1 ? current - 1 : 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link
        to={`${location.pathname}?page=${prev}`}
        className='btn'
        style={{ marginRight: 5, backgroundColor: 'transparent' }}>
        <Icon type='left' />
      </Link>

      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--dark-grey)',
        }}>
        {current}/{total}
      </div>

      <Link
        to={`${location.pathname}?page=${next}`}
        className='btn'
        style={{ marginLeft: 5, backgroundColor: 'transparent' }}>
        <Icon type='right' />
      </Link>
    </div>
  );
};

export default Pagination;
