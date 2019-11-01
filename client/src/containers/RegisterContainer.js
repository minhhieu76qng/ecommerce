import { connect } from 'react-redux';
import Register from '../components/login_register/Register';
import { closeRegister, openLogin } from '../actions/loginRegisterAction';

const mapStateToProps = state => {
  return {
    isOpen: state.loginRegister.openRegister,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
