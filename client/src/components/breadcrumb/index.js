import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import uuidv1 from 'uuid/v1';

const PageBreadcrumb = ({ planeCategories: list, categoryID }) => {

  // tim kiem breadcrumb tu list
  let breadcrumbs = [];

  if (list && list.length !== 0) {
    let cateID = categoryID;
    do {
      const cate = list.filter(val => val._id === cateID);

      if (cate.length === 0) {
        break;
      }

      if (cate.length === 1) {
        breadcrumbs = breadcrumbs.concat(cate);
        cateID = cate[0].parent;
      }

      if (!cateID) {
        break;
      }
    }
    while (true);
  }

  // reverse array
  breadcrumbs.reverse();

  return (
    <div
      className='page-breadcum'
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0 30px 0',
      }}>
      <Breadcrumb>
        {breadcrumbs &&
          breadcrumbs.map(item => (
            <Breadcrumb.Item key={uuidv1()}>
              <Link to={`/categories/${item._id}`}>{item.name}</Link>
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
