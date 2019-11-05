import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';

const PageBreadcrumb = ({ breadcrumb: list, fetchBreadcrumb }) => {

  const { id: cateID } = useParams();

  useEffect(() => {
    fetchBreadcrumb(cateID);
  }, [cateID])

  return (
    <div
      className='page-breadcum'
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0 30px 0',
      }}>
      <Breadcrumb>
        {list && list.map(item => (
          <Breadcrumb.Item>
            <Link to={`/category/${item.id}`}>{item.name}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
