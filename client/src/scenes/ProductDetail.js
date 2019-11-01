import React from 'react';
import ProductInfo from '../components/product/ProductInfo';
import PageBreadcrumb from '../components/breadcrumb';
import ProductReview from '../components/product/ProductReview';
import AlsoLike from '../components/product/AlsoLike';

const ProductDetail = () => {
  return (
    <>
      <PageBreadcrumb />
      <ProductInfo />
      <ProductReview />
      <AlsoLike />
    </>
  );
};

export default ProductDetail;
