import { connect } from 'react-redux';
import CartItem from '../components/cart/CartItem';
import { fetchCart } from '../actions/cartAction';

const mapStateToProps = state => {
  return {
    sizes: state.productAttributes.sizes,
    colors: state.productAttributes.colors,
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
)(CartItem);
