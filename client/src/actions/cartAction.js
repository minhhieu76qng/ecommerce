import AuthAxios from '../utils/AuthAxios';

export const SET_CART = 'SET_CART';
export const SET_ERROR = 'SET_ERROR';

export function setCart(cart) {
  return { type: SET_CART, cart };
}

export function setErrors(errors) {
  return { type: SET_ERROR, errors };
}

export function fetchCart() {
  return dispatch => {
    AuthAxios.CreateInstance().get('/api/cart')
      .then(({ data: { cart: list } }) => {
        dispatch(setCart(list))
      })
      .catch(({ response: { data: { errors } } }) => {
        dispatch(setErrors(errors));
      })
  }
}