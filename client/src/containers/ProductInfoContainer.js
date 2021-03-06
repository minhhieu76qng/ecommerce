import { connect } from 'react-redux';
import ProductInfo from '../components/product/ProductInfo';
import { fetchCart } from '../actions/cartAction';

const mapStateToProps = state => {
  return {
    sizes: state.productAttributes.sizes,
    colors: state.productAttributes.colors,
    brands: state.productAttributes.brands,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => {
      dispatch(fetchCart());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductInfo);
