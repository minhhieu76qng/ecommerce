import { connect } from 'react-redux';
import ForgotPassword from '../components/login_register/ForgotPassword';
import {
  openLogin,
  closeForgotPassword,
  clearMessage,
} from '../actions/loginRegisterAction';

const mapStateToProps = state => {
  return {
    isOpen: state.loginRegister.openForgotPw,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(closeForgotPassword());
    },
    openLogin: () => {
      dispatch(openLogin());
    },
    clearMessage: () => {
      dispatch(clearMessage());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
