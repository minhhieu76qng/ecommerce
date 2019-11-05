import axios from 'axios';

export const FETCHED_NAVBAR = 'FETCHED_NAVBAR';
export const FETCHED_ROOT_CATEGORY = 'FETCHED_ROOT_CATEGORY';

export function saveNavbarMenu(list) {
  return { type: FETCHED_NAVBAR, list };
}

export function saveRootCategory(list) {
  return { type: FETCHED_ROOT_CATEGORY, list };
}

export function fetchRootCategory() {
  return dispatch => {
    axios.get('/api/category/root')
      .then(response => {
        const list = response.data.list;
        dispatch(saveRootCategory(list));
      })
      .catch(err => {
        dispatch(saveRootCategory([]))
      })
  }
}

// fetch api
export function fetchMenu() {
  return dispatch => {
    axios
      .get('/api/category/menu')
      .then(response => {
        const menu = response.data.menu;

        dispatch(saveNavbarMenu(menu));
      })
      .catch(err => {
        dispatch(saveNavbarMenu([]));
      });
  };
}
