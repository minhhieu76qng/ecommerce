import AuthAxios from '../utils/AuthAxios';

export const SET_CART = 'SET_CART';
export const SET_ERROR = 'SET_ERROR';
export const SET_ISFETCHING = 'SET_ISFETCHING';

export function setIsFetching(isFetching) {
  return { type: SET_ISFETCHING, isFetching };
}

export function setCart(cart) {
  return { type: SET_CART, cart };
}

export function setErrors(errors) {
  return { type: SET_ERROR, errors };
}

export function fetchCart() {
  return dispatch => {
    dispatch(setIsFetching(true));
    AuthAxios.CreateInstance()
      .get('/api/cart')
      .then(({ data: { cart: list } }) => {
        dispatch(setCart(list));
      })
      .catch(({ response: { data: { errors } } }) => {
        dispatch(setErrors(errors));
      })
      .finally(function() {
        dispatch(setIsFetching(false));
      });
  };
}
