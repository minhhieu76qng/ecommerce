
import axios from 'axios';
export const SET_FETCHING_CATEGORIES = 'SET_FETCHING_CATEGORIES';
export const SET_FETCHING_PRODUCTS = 'SET_FETCHING_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

export function setFetchingCategories(status) {
  return { type: SET_FETCHING_CATEGORIES, status };
}
export function setFetchingProducts(status) {
  return { type: SET_FETCHING_PRODUCTS, status };
}

export function setCategories(list) {
  return { type: SET_CATEGORIES, list }
}

export function setProducts(list) {
  return { type: SET_PRODUCTS, list }
}

export function setCurrentCategory(cate) {
  return { type: SET_CURRENT_CATEGORY, cate };
}
// middlewares

export function fetchCategories(parentCateID) {
  return dispatch => {
    dispatch(setFetchingCategories(true));

    axios.get(`/api/categories/${parentCateID}/categories`)
      .then(response => {

        const parent = response.data.parent;
        console.log(parent);

        dispatch(setCurrentCategory(parent));

        const list = response.data.childs;

        dispatch(setCategories(list));
      })
      .catch(err => {
        dispatch(setCategories(null));
      })
      .finally(() => {
        dispatch(setFetchingCategories(false));
      })
  }
}

export function fetchProducts(categoryID) {
  return dispatch => {
    dispatch(setFetchingProducts(true));

    axios.get(`/api/categories/${categoryID}/products`)
      .then(response => {
        const list = response.data.list;

        dispatch(setProducts(list));
      })
      .catch(err => {
        dispatch(setProducts(null));
      })
      .finally(() => {
        dispatch(setFetchingProducts(false));
      })
  }
}