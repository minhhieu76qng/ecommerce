import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'antd';
import './index.scss';

const Paginatev2 = ({ totalItems = 0, itemsPerPage = 10, currentPage = 1 }) => {
  const location = useLocation();

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  let temp = new Array(totalPage).fill(null);
  temp = temp.map((val, idx) => idx + 1);

  return (
    <div className='pagination'>
      <Link className='button-link' to={`${location.pathname}?page=1`}>
        <Icon type='vertical-right' />
      </Link>

      <Link
        className='button-link'
        to={`${location.pathname}?page=${
          currentPage > 1 ? currentPage - 1 : 1
        }`}>
        <Icon type='left' />
      </Link>

      {temp &&
        temp.map(val => (
          <Link
            key={val}
            className={`button-link ${currentPage === val ? 'active' : ''}`}
            to={`${location.pathname}?page=${val}`}>
            {val}
          </Link>
        ))}

      <Link
        className='button-link'
        to={`${location.pathname}?page=${
          currentPage < totalPage ? currentPage + 1 : totalPage
        }`}>
        <Icon type='right' />
      </Link>

      <Link
        className='button-link'
        to={`${location.pathname}?page=${totalPage}`}>
        <Icon type='vertical-left' />
      </Link>
    </div>
  );
};

export default Paginatev2;
