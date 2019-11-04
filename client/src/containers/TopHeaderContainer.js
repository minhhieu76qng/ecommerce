import { connect } from 'react-redux';
import TopHeader from '../components/header/topHeader';
import {
  openLogin,
  openRegister,
  logOut,
} from '../actions/loginRegisterAction';
import { extractAndSaveUser } from '../actions/accountAction';

const mapStateToProps = state => {
  return {
    isOpenLogin: state.loginRegister.openLogin,
    isOpenRegister: state.loginRegister.openRegister,
    user: state.account.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLogin: () => {
      dispatch(openLogin());
    },
    openRegister: () => {
      dispatch(openRegister());
    },
    logOut: () => {
      dispatch(logOut());
      dispatch(extractAndSaveUser());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopHeader);
