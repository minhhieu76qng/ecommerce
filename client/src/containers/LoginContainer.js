import { connect } from 'react-redux';
import Login from '../components/login_register/Login';
import {
  closeLogin,
  openForgotPassword,
  openRegister,
} from '../actions/loginRegisterAction';

const mapStateToProps = state => {
  return {
    isOpen: state.loginRegister.openLogin,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
