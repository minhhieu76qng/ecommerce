import jwt from 'jsonwebtoken';

function isValidToken() {
  const token = localStorage.getItem('token');

  const user = jwt.decode(token);
  if (!user) {
    return false;
  }
  return true;
}

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function removeToken() {
  localStorage.removeItem('token');
}

function getUserFromToken() {
  const token = localStorage.getItem('token');

  const user = jwt.decode(token);

  return user;
}

export default {
  isValidToken,
  getToken,
  setToken,
  removeToken,
  getUserFromToken,
};
