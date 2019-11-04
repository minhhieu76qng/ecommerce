import { connect } from 'react-redux';
import Header from '../components/header/index';

const mapStateToProps = state => {
  return {
    openLogin: state.loginRegister.openLogin,
    openRegister: state.loginRegister.openRegister,
    openForgotPw: state.loginRegister.openForgotPw,
  };
};

export default connect(mapStateToProps)(Header);
