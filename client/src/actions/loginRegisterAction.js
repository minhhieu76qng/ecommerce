export const OPEN_LOGIN = 'OPEN_LOGIN';
export const CLOSE_LOGIN = 'CLOSE_LOGIN';
export const OPEN_REGISTER = 'OPEN_REGISTER';
export const CLOSE_REGISTER = 'CLOSE_REGISTER';

export function openLogin() {
  return { type: OPEN_LOGIN }
}
export function closeLogin() {
  return { type: CLOSE_LOGIN }
}
export function openRegister() {
  return { type: OPEN_REGISTER }
}
export function closeRegister() {
  return { type: CLOSE_REGISTER }
}