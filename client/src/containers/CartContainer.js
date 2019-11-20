import { connect } from 'react-redux';
import Cart from '../components/cart';
import { fetchCart, setIsFetching } from '../actions/cartAction';

const mapStateToProps = state => {
  return {
    isFetching: state.cart.isFetching,
    list: state.cart.list,
    sizes: state.productAttributes.sizes,
    colors: state.productAttributes.colors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => {
      dispatch(fetchCart());
    },
    setFetching: isFetching => {
      dispatch(setIsFetching(isFetching));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
