import axios from 'axios'

export const OPEN_LOGIN = 'OPEN_LOGIN';
export const CLOSE_LOGIN = 'CLOSE_LOGIN';
export const OPEN_REGISTER = 'OPEN_REGISTER';
export const CLOSE_REGISTER = 'CLOSE_REGISTER';
export const OPEN_FORGOT_PW = 'OPEN_FORGOT_PW';
export const CLOSE_FORGOT_PW = 'CLOSE_FORGOT_PW';
export const START_FETCHING = 'START_FETCHING';
export const STOP_FETCHING = 'STOP_FETCHING';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export function openLogin() {
  return { type: OPEN_LOGIN };
}
export function closeLogin() {
  return { type: CLOSE_LOGIN };
}
export function openRegister() {
  return { type: OPEN_REGISTER };
}
export function closeRegister() {
  return { type: CLOSE_REGISTER };
}
export function openForgotPassword() {
  return { type: OPEN_FORGOT_PW };
}
export function closeForgotPassword() {
  return { type: CLOSE_FORGOT_PW };
}

export function startFetching() {
  return { type: START_FETCHING }
}
export function stopFetching(success, errors) {
  return { type: STOP_FETCHING, success, errors }
}
export function clearMessage() {
  return { type: CLEAR_MESSAGE };
}

// middlewares
export function register(email, password, name) {
  return dispatch => {
    dispatch(startFetching());

    // 
    axios.post('/api/auth/register', {
      email, password, name
    }).then(response => {
      console.log(response);
      const success = response.data.success;

      dispatch(stopFetching(success, null));
    })
      .catch(err => {
        console.log(err.response);
        const errors = err.response.data.errors;

        dispatch(stopFetching(null, errors));
      })
  }
}