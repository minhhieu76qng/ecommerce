import { connect } from 'react-redux';
import ProductInfo from '../components/product/ProductInfo';

const mapStateToProps = state => {
  return {
    sizes: state.productAttributes.sizes,
    colors: state.productAttributes.colors,
    brands: state.productAttributes.brands,
  };
};

export default connect(mapStateToProps)(ProductInfo);
