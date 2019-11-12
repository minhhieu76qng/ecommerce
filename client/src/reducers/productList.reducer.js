import {
  SET_FETCHING_PRODUCTS,
  SET_LIST_PRODUCT,
} from '../actions/productListAction';

const initialState = {
  isFetchingProducts: false,
  products: [],
};

export default function productList(state = initialState, action) {
  switch (action.type) {
    case SET_FETCHING_PRODUCTS:
      return { ...state, isFetchingProducts: action.status };
    case SET_LIST_PRODUCT:
      return { ...state, products: action.list };
    default:
      return { ...state };
  }
}
