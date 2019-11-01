import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Category = () => {
  return (
    <div className='category widget-sidebar'>
      <h3 className='title'>Category</h3>

      <ul className='list'>
        <li className='active'>
          <Link className='link' to='/category/77s878h86s787f'>
            All dresses
          </Link>
        </li>
        <li>
          <Link className='link' to='/category/77s878h86s787f'>
            Rompers / Jumpsuits
          </Link>
        </li>
        <li>
          <Link className='link' to='/category/77s878h86s787f'>
            Casual dresses
          </Link>
        </li>
        <li>
          <Link className='link' to='/category/77s878h86s787f'>
            Going out dresses
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Category;
