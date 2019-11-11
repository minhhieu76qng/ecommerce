import jwt from 'jsonwebtoken';

class Token {
  constructor() {
    this.token_string = 'token';
  }

  isValidToken() {
    const token = localStorage.getItem(this.token_string);

    const user = jwt.decode(token);
    if (!user) {
      return false;
    }
    return true;
  }

  getToken() {
    return localStorage.getItem(this.token_string);
  }

  setToken(token) {
    localStorage.setItem(this.token_string, token);
  }

  removeToken() {
    localStorage.removeItem(this.token_string);
  }

  getUserFromToken() {
    const token = localStorage.getItem(this.token_string);
    if (!token) return null;

    const user = jwt.decode(token);

    return user;
  }

  isSeller() {
    const user = this.getUserFromToken();
    if (!user || !user.isSeller) {
      return false;
    }

    return true;
  }
}

export class UserToken extends Token {
  constructor() {
    super();
    this.token_string = 'token';
  }
}

export class SellerToken extends Token {
  constructor() {
    super();
    this.token_string = 'seller_token';
  }
}