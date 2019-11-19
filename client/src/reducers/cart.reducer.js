import { SET_CART, SET_ERROR, SET_ISFETCHING } from '../actions/cartAction';
const initialState = {
  isFerching: false,
  list: [],
  errors: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case SET_ISFETCHING:
      return { ...state, isFetching: action.isFetching };
    case SET_CART:
      return { ...state, list: [...action.cart] };
    case SET_ERROR:
      return { ...state, errors: [...action.errors] };
    default:
      return state;
  }
}
