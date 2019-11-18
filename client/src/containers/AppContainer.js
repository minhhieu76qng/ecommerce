import { connect } from 'react-redux';
import App from '../App';
import { extractAndSaveUser } from '../actions/accountAction';
import {
  fetchSizes,
  fetchColors,
  fetchBrands,
} from '../actions/productAttributesAction';
import { fetchCategories } from '../actions/categoryAction';

const mapDispatchToProps = dispatch => {
  return {
    extractAndStoreUser: () => {
      dispatch(extractAndSaveUser());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
    fetchSizes: () => {
      dispatch(fetchSizes());
    },
    fetchColors: () => {
      dispatch(fetchColors());
    },
    fetchBrands: () => {
      dispatch(fetchBrands());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
