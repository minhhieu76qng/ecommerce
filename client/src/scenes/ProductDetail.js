import React from 'react';
import { useParams } from 'react-router-dom';
import PageBreadcrumb from '../components/breadcrumb';
import ProductReview from '../components/product/ProductReview';
import AlsoLike from '../components/product/AlsoLike';
import ProductInfoContainer from '../containers/ProductInfoContainer';

const ProductDetail = () => {
  const { id: productId } = useParams();

  return (
    <>
      {/* <PageBreadcrumb /> */}
      <ProductInfoContainer productId={productId} />
      <ProductReview />
      <AlsoLike productId={productId} />
    </>
  );
};

export default ProductDetail;
