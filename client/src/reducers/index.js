import { combineReducers } from 'redux';
import loginRegister from './loginRegister.reducer';
import account from './account.reducer';
import category from './category.reducer';
import productList from './productList.reducer';
import sellerLogin from './sellerLogin.reducer';

const reducer = combineReducers({
  loginRegister,
  account,
  category,
  productList,
  // sellerLogin
});

export default reducer;
