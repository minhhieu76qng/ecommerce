import { connect } from 'react-redux';
import Cart from '../components/cart';
import { fetchCart } from '../actions/cartAction';

const mapStateToProps = state => {
  return {
    isFetching: state.cart.isFetching,
    list: state.cart.list,
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
)(Cart);
