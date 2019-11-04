import { connect } from 'react-redux';
import Login from '../components/login_register/Login';
import {
  closeLogin,
  openForgotPassword,
  openRegister,
  clearMessage,
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
    clearMessage: () => {
      dispatch(clearMessage());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
