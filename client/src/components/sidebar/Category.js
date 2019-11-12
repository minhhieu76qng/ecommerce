import React from 'react';
import { Link, useParams } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import './index.scss';

const Category = ({ planeCategories: list }) => {
  const { id: categoryID } = useParams();

  // nếu categoryID không phải leaf -> render như bình thường. currentCategory = categoryID

  // ngược lại
  /* 
  - lấy currentID là cha của leaf
  
  
  */
  // không tìm thấy currentCategory -> id này không có trong mảng -> không cần làm gì

  const arrCate = list.filter(val => val._id === categoryID);
  let currentID = categoryID;
  let currentCategory = null;

  if (arrCate.length !== 0) {
    currentCategory = arrCate[0];

    if (currentCategory.isLeaf) {
      currentID = currentCategory.parent;
      currentCategory = list.filter(val => val._id === currentID)[0];
    }
  }

  const childs = list.filter(val => val.parent === currentID);

  return (
    <div className='category widget-sidebar'>
      <h3 className='title'>Category</h3>

      {childs && currentCategory && (
        <ul className='list'>
          <li
            className={`${currentCategory._id === categoryID ? 'active' : ''}`}>
            <Link className='link' to={`/categories/${currentCategory._id}`}>
              {`All ${currentCategory.name.toLowerCase()}`}
            </Link>
          </li>

          {childs &&
            childs.map(item => (
              <li
                key={uuidv1()}
                className={`${item._id === categoryID ? 'active' : ''}`}>
                <Link className={`link`} to={`/categories/${item._id}`}>
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
