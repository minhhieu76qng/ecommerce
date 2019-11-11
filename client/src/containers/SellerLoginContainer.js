import { connect } from 'react-redux';
import WrappedLoginSeller from '../components/seller/login/Login';
import { login, setOpenForgotPw } from '../actions/sellerLoginAction';

const mapStateToProps = (state) => {
  return {
    isFetching: state.sellerLogin.isFetching,
    openLogin: state.sellerLogin.openLogin,
    openForgotPassword: state.sellerLogin.openForgotPassword,
    errors: state.sellerLogin.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    },
    openModalForgotPassword: () => {
      dispatch(setOpenForgotPw(true));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginSeller)