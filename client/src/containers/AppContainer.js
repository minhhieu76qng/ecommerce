import { connect } from 'react-redux';
import App from '../App';
import { extractAndSaveUser } from '../actions/accountAction';

const mapDispatchToProps = dispatch => {
  return {
    extractAndStoreUser: () => {
      dispatch(extractAndSaveUser());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
