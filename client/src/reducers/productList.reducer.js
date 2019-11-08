import { SET_FETCHING_CATEGORIES, SET_FETCHING_PRODUCTS, SET_PRODUCTS, SET_CATEGORIES, SET_CURRENT_CATEGORY } from "../actions/productListAction";

const initialState = {
  isFetchingCategories: false,
  isFetchingProducts: false,
  currentCategory: null,
  listProducts: [],
  listCategories: [],
};

export default function productList(state = initialState, action) {
  switch (action.type) {
    case SET_FETCHING_CATEGORIES:
      return { ...state, isFetchingCategories: action.status }
    case SET_FETCHING_PRODUCTS:
      return { ...state, isFetchingProducts: action.status }
    case SET_CATEGORIES:
      return { ...state, listCategories: [...action.list] }
    case SET_PRODUCTS:
      return { ...state, listProducts: action.list }
    case SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.cate }
    default:
      return { ...state };
  }
}
