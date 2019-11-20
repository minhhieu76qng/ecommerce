import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'antd';
import './index.scss';

const Paginatev2 = ({ totalPage = 1, currentPage = 1 }) => {
  const location = useLocation();

  let temp = new Array(totalPage).fill(null);
  temp = temp.map((val, idx) => idx + 1);

  return (
    <div className='pagination'>
      <Link className='button-link' to={`${location.pathname}?page=`}>
        <Icon type="vertical-right" />
      </Link>

      <Link className='button-link' to={`${location.pathname}?page=`}>
        <Icon type="left" />
      </Link>

      {temp && temp.map(val => (
        <Link className={`button-link ${currentPage === val ? 'active' : ''}`} to={`${location.pathname}?page=${val}`}>
          {val}
        </Link>
      ))}

      <Link className='button-link' to={`${location.pathname}?page=`}>
        <Icon type="right" />
      </Link>

      <Link className='button-link' to={`${location.pathname}?page=`}>
        <Icon type="vertical-left" />
      </Link>
    </div>
  );
};

export default Paginatev2;