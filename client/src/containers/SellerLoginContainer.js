import { connect } from 'react-redux';
import WrappedLoginSeller from '../components/seller/login/Login';

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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginSeller)