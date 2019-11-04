import { connect } from 'react-redux';
import Register from '../components/login_register/Register';
import { closeRegister, openLogin, register, clearMessage } from '../actions/loginRegisterAction';

const mapStateToProps = state => {
  return {
    isOpen: state.loginRegister.openRegister,
    success: state.loginRegister.success,
    errors: state.loginRegister.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(closeRegister());
    },
    openLogin: () => {
      dispatch(openLogin());
    },
    register: (email, password, name) => {
      dispatch(register(email, password, name));
    },
    clearMessage: () => {
      dispatch(clearMessage());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
