import { combineReducers } from 'redux';
import loginRegister from './loginRegister.reducer';
import account from './account.reducer';
import category from './category.reducer';

const reducer = combineReducers({
  loginRegister,
  account,
  category,
});

export default reducer;
