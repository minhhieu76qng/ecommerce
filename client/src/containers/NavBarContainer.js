import { connect } from 'react-redux';
import NavBar from '../components/header/navbar';
import { fetchMenu } from '../actions/navbarAction';

const mapStateToProps = state => {
  return {
    menu: state.navBar.menu,
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
