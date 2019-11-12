import axios from 'axios';

// export const FETCHED_NAVBAR = 'FETCHED_NAVBAR';
// export const FETCHED_ROOT_CATEGORY = 'FETCHED_ROOT_CATEGORY';
// export const FETCHED_BREADCRUMB = 'FETCHED_BREADCRUMB';

// export function saveNavbarMenu(list) {
//   return { type: FETCHED_NAVBAR, list };
// }

// export function saveRootCategory(list) {
//   return { type: FETCHED_ROOT_CATEGORY, list };
// }

// export function saveBreadcrumb(list) {
//   return { type: FETCHED_BREADCRUMB, list };
// }

// // MIDDLEWARES

// export function fetchRootCategory() {
//   return dispatch => {
//     axios
//       .get('/api/categories/root')
//       .then(response => {
//         const list = response.data.list;
//         dispatch(saveRootCategory(list));
//       })
//       .catch(err => {
//         dispatch(saveRootCategory([]));
//       });
//   };
// }

// // fetch api
// export function fetchMenu() {
//   return dispatch => {
//     axios
//       .get('/api/categories/menu')
//       .then(response => {
//         const menu = response.data.menu;
//         dispatch(saveNavbarMenu(menu));
//       })
//       .catch(err => {
//         dispatch(saveNavbarMenu([]));
//       });
//   };
// }

// export function fetchBreadcrumb(cateID) {
//   return dispatch => {
//     axios
//       .get(`/api/categories/${cateID}/breadcrumb`)
//       .then(response => {
//         const breadcrumb = response.data.list;
//         dispatch(saveBreadcrumb(breadcrumb));
//       })
//       .catch(err => {
//         dispatch(saveBreadcrumb([]));
//       });
//   };
// }

export const SET_CATEGORIES = 'SET_CATEGORIES';

export function setCategories(categories) {
  return { type: SET_CATEGORIES, categories };
}

export function fetchCategories() {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(response => response.data.result)
      .then(categories => {
        dispatch(setCategories(categories));
      })
      .catch(error => {});
  };
}
