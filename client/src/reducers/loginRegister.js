import {
  OPEN_LOGIN,
  CLOSE_REGISTER,
  CLOSE_LOGIN,
  OPEN_REGISTER,
  OPEN_FORGOT_PW,
  CLOSE_FORGOT_PW,
} from '../actions/loginRegisterAction';

const initialState = {
  openLogin: false,
  openRegister: false,
  openForgotPw: false,
};

export default function loginRegister(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN:
      return {
        ...state,
        openLogin: true,
        openRegister: false,
        openForgotPw: false,
      };
    case CLOSE_LOGIN:
      return {
        ...state,
        openLogin: false,
        openRegister: false,
        openForgotPw: false,
      };
    case OPEN_REGISTER:
      return {
        ...state,
        openLogin: false,
        openRegister: true,
        openForgotPw: false,
      };
    case CLOSE_REGISTER:
      return {
        ...state,
        openLogin: false,
        openRegister: false,
        openForgotPw: false,
      };
    case OPEN_FORGOT_PW:
      return {
        ...state,
        openLogin: false,
        openRegister: false,
        openForgotPw: true,
      };
    case CLOSE_FORGOT_PW:
      return {
        ...state,
        openLogin: false,
        openRegister: false,
        openForgotPw: false,
      };
    default:
      return state;
  }
}
