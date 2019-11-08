import { UserToken } from '../utils/LocalStorage';
const userToken = new UserToken();

export const STORE_USER = 'STORE_USER';

export function storeUser(user) {
  return { type: STORE_USER, user };
}

export function extractAndSaveUser() {
  return dispatch => {
    const user = userToken.getUserFromToken();

    dispatch(storeUser(user));
  };
}
