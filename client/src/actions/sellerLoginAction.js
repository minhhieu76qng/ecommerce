import axios from 'axios';

export const SET_OPEN_LOGIN = 'SET_OPEN_LOGIN';
export const SET_OPEN_FORGOT_PASSWORD = 'SET_OPEN_FORGOT_PASSWORD';
export const SET_FETCHING = 'SET_FETCHING';
export const NOTIFY_ERROR = 'NOTIFY_ERROR';

export function setOpenLogin(status) {
  return { type: SET_OPEN_LOGIN, status }
}

export function setOpenForgotPw(status) {
  return { type: SET_OPEN_FORGOT_PASSWORD, status }
}

export function setFetching(status) {
  return { type: SET_FETCHING, status };
}

export function notifyError(errors) {
  return { type: NOTIFY_ERROR, errors }
}

export function login(email, password) {
  return dispatch => {
    dispatch(setFetching(true));

    axios.post(`/api/auth/seller/login`, { email, password })
      .then(response => {
        console.log(response);

        const token = response.data.token;
      })
      .catch(err => {
        const errors = err.response.errors;
        dispatch(notifyError(errors));
      })
      .finally(function () {
        dispatch(setFetching(false));
      })
  }
}