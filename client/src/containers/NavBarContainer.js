import { connect } from 'react-redux';
import NavBar from '../components/header/navbar';
import { fetchMenu } from '../actions/categoryAction';

const mapStateToProps = state => {
  return {
    navBarMenu: state.category.navBarMenu,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMenu: () => {
      dispatch(fetchMenu());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
