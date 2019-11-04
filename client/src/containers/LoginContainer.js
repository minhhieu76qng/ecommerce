import { connect } from 'react-redux';
import Login from '../components/login_register/Login';
import {
  closeLogin,
  openForgotPassword,
  openRegister,
  clearMessage,
  login,
} from '../actions/loginRegisterAction';

const mapStateToProps = state => {
  return {
    isOpen: state.loginRegister.openLogin,
    errors: state.loginRegister.errors,
    loggedIn: state.loginRegister.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(closeLogin());
    },
    openForgotPw: () => {
      dispatch(openForgotPassword());
    },
    openRegister: () => {
      dispatch(openRegister());
    },
    clearMessage: () => {
      dispatch(clearMessage());
    },
    login: (email, password) => {
      dispatch(login(email, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
