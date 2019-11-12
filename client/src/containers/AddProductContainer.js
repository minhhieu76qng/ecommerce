import { connect } from 'react-redux';
import WrappedAddProduct from '../components/seller/product/AddProduct';

const mapStateToProps = state => {
  return {
    planeCategories: state.category.planeCategories
  }
}

export default connect(mapStateToProps)(WrappedAddProduct);