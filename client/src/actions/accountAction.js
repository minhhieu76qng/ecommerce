import LocalStorage from '../utils/LocalStorage';

export const STORE_USER = 'STORE_USER';

export function storeUser(user) {
  return { type: STORE_USER, user };
}

export function extractAndSaveUser() {
  return dispatch => {
    const user = LocalStorage.getUserFromToken();

    dispatch(storeUser(user));
  };
}
