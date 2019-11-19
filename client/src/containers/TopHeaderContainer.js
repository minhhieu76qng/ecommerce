import { connect } from 'react-redux';
import TopHeader from '../components/header/topHeader';
import {
  openLogin,
  openRegister,
  logOut,
} from '../actions/loginRegisterAction';
import { extractAndSaveUser } from '../actions/accountAction';
import { fetchCart } from '../actions/cartAction';

const mapStateToProps = state => {
  return {
    isOpenLogin: state.loginRegister.openLogin,
    isOpenRegister: state.loginRegister.openRegister,
    user: state.account.user,
    sizes: state.productAttributes.sizes,
    colors: state.productAttributes.colors,
    cart: state.cart.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLogin: () => {
      dispatch(openLogin());
    },
    openRegister: () => {
      dispatch(openRegister());
    },
    logOut: () => {
      dispatch(logOut());
      dispatch(extractAndSaveUser());
    },
    fetchCart: () => {
      dispatch(fetchCart());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopHeader);
