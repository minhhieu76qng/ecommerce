import { OPEN_LOGIN, CLOSE_REGISTER, CLOSE_LOGIN, OPEN_REGISTER } from '../actions/loginRegisterAction';



const initialState = {
  openLogin: false,
  openRegister: false
};

export default function loginRegister(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN:
      return { ...state, openLogin: true };
    case CLOSE_LOGIN:
      return { ...state, openLogin: false };
    case OPEN_REGISTER:
      return { ...state, openRegister: true };
    case CLOSE_REGISTER:
      return { ...state, openRegister: false };
    default:
      return state;
  }
}