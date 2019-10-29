import { connect } from 'react-redux';
import Login from '../components/login_register/Login';
import { closeLogin } from '../actions/loginRegisterAction';

const mapStateToProps = (state) => {
  return {
    isOpen: state.loginRegister.openLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(closeLogin())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);