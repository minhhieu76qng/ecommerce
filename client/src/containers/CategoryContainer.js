import { connect } from 'react-redux';
import Category from '../components/sidebar/Category';

const mapStateToProps = (state) => {
  return {
    planeCategories: state.category.planeCategories,
    products: state.productList.products,
  }
}

export default connect(mapStateToProps)(Category);