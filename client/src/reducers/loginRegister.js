import {
  OPEN_LOGIN,
  CLOSE_REGISTER,
  CLOSE_LOGIN,
  OPEN_REGISTER,
  OPEN_FORGOT_PW,
  CLOSE_FORGOT_PW,
  START_FETCHING,
  STOP_FETCHING,
  CLEAR_MESSAGE
} from '../actions/loginRegisterAction';

const initialState = {
  openLogin: false,
  openRegister: false,
  openForgotPw: false,
  isFetching: false,
  success: null,
  errors: []
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
    case START_FETCHING:
      return { ...state, isFetching: true, success: null, errors: [] }
    case STOP_FETCHING:
      return { ...state, isFetching: false, success: action.success, errors: action.errors }
    case CLEAR_MESSAGE:
      return { ...state, success: null, errors: [] }
    default:
      return state;
  }
}
