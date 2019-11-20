import { connect } from 'react-redux';
import ProductItem from '../components/product/ProductItem';
import { fetchCart } from '../actions/cartAction';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductItem);