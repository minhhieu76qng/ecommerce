import { combineReducers } from 'redux';
import loginRegister from './loginRegister.reducer';
import account from './account.reducer';
import category from './category.reducer';
import productList from './productList.reducer';
import productAttributes from './productAttributes.reducer';
import cart from './cart.reducer';

const reducer = combineReducers({
  loginRegister,
  account,
  category,
  productList,
  productAttributes,
  cart
});

export default reducer;
