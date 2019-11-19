import { SET_CART, SET_ERROR } from "../actions/cartAction";
const initialState = {
  list: [],
  errors: []
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, list: [...action.cart] }
    case SET_ERROR:
      return { ...state, errors: [...action.errors] }
    default:
      return state;
  }
}