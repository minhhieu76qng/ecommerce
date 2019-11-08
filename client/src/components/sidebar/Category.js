import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import './index.scss';

const Category = ({ listCategories: list, currentCategory, fetchCategories }) => {

  const { id: parentCateID } = useParams();

  useEffect(() => {
    fetchCategories(parentCateID);
  }, [parentCateID])

  return (
    <div className='category widget-sidebar'>
      <h3 className='title'>Category</h3>

      {list && currentCategory &&
        <ul className='list'>
          <li className={`${currentCategory._id === parentCateID ? 'active' : ''}`}>
            <Link className='link' to={`/categories/${currentCategory._id}`}>
              {`All ${currentCategory.name.toLowerCase()}`}
            </Link>
          </li>
          {list && list.map(item => (
            <li className={`${item._id === parentCateID ? 'active' : ''}`} key={uuidv1()}>
              <Link className={`link`} to={`/categories/${item._id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Category;
