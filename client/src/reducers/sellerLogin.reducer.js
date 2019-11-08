import { SET_OPEN_LOGIN, SET_OPEN_FORGOT_PASSWORD, SET_FETCHING, STOP_FETCHING } from "../actions/sellerLoginAction";

const initialState = {
  isFetching: false,
  openLogin: true,
  openForgotPassword: false,
  errors: []
}

export default function sellerLogin(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_LOGIN:
      return { ...state, openLogin: action.status }
    case SET_OPEN_FORGOT_PASSWORD:
      return { ...state, openForgotPassword: action.status }
    case SET_FETCHING:
      return { ...state, isFetching: action.status }
    default:
      return state;
  }
}