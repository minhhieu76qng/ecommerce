import axios from 'axios';

export const FETCHED_NAVBAR = 'FETCHED_NAVBAR';

export function saveMenu(menu) {
  return { type: FETCHED_NAVBAR, menu };
}

// fetch api
export function fetchMenu() {
  return dispatch => {
    axios
      .get('/api/category/menu')
      .then(response => {
        const menu = response.data.menu;

        dispatch(saveMenu(menu));
      })
      .catch(() => {
        dispatch(saveMenu([]));
      });
  };
}
