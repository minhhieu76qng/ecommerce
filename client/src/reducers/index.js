import { combineReducers } from 'redux';
import loginRegister from './loginRegister.reducer';
import account from './account.reducer';
import navBar from './navbar.reducer';

const reducer = combineReducers({
  loginRegister,
  account,
  navBar,
});

export default reducer;
