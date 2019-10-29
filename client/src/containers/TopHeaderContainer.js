import { connect } from 'react-redux';
import TopHeader from '../components/header/topHeader';
import { openLogin, openRegister } from '../actions/loginRegisterAction';

const mapStateToProps = (state) => {
  return {
    isOpenLogin: state.loginRegister.openLogin,
    isOpenRegister: state.loginRegister.openRegister
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => {
      dispatch(openLogin())
    },
    openRegister: () => {
      dispatch(openRegister())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);