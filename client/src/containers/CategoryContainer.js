import { connect } from 'react-redux';
import Category from '../components/sidebar/Category';
import { fetchCategories } from '../actions/productListAction';

const mapStateToProps = (state) => {
  return {
    listCategories: state.productList.listCategories,
    currentCategory: state.productList.currentCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: parentID => {
      dispatch(fetchCategories(parentID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);