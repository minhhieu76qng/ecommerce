import Axios from 'axios';
import { UserToken } from './LocalStorage';

const userToken = new UserToken();

function CreateInstance() {

  if (!userToken.isValidToken()) {
    userToken.removeToken();
  }
  const token = userToken.getToken();

  const instance = Axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  return instance;
}

export default {
  CreateInstance
};