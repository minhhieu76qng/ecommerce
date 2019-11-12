import { combineReducers } from 'redux';
import loginRegister from './loginRegister.reducer';
import account from './account.reducer';
import category from './category.reducer';
import productList from './productList.reducer';

const reducer = combineReducers({
  loginRegister,
  account,
  category,
  productList,
});

export default reducer;
