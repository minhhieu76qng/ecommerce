
import axios from 'axios';
export const SET_FETCHING_PRODUCTS = 'SET_FETCHING_PRODUCTS';
export const SET_LIST_PRODUCT = 'SET_LIST_PRODUCT';

export function setFetchingProducts(status) {
  return { type: SET_FETCHING_PRODUCTS, status };
}

export function setListProduct(list) {
  return { type: SET_LIST_PRODUCT, list };
}
// middlewares
export function fetchProducts(categoryID) {
  return dispatch => {
    dispatch(setFetchingProducts(true));

    axios.get(`/api/categories/${categoryID}/products`)
      .then(response => {
        const list = response.data.list;

        dispatch(setListProduct(list));
      })
      .catch(err => {
        dispatch(setListProduct(null));
      })
      .finally(() => {
        dispatch(setFetchingProducts(false));
      })
  }
}