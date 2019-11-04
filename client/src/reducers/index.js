import { combineReducers } from 'redux';
import loginRegister from './loginRegister.reducer';
import account from './account.reducer';

const reducer = combineReducers({
  loginRegister,
  account,
});

export default reducer;
