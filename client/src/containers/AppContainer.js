import { connect } from 'react-redux';
import App from '../App';
import { extractAndSaveUser } from '../actions/accountAction';
import { fetchCategories } from '../actions/categoryAction';

const mapDispatchToProps = dispatch => {
  return {
    extractAndStoreUser: () => {
      dispatch(extractAndSaveUser());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
