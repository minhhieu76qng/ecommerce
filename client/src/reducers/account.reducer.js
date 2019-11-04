import { STORE_USER } from '../actions/accountAction';

const initialState = {
  user: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case STORE_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
}
