import { FETCHED_NAVBAR } from '../actions/navbarAction';

const initialState = {
  menu: [],
};

export default function navBar(state = initialState, action) {
  switch (action.type) {
    case FETCHED_NAVBAR:
      return { ...state, menu: action.menu };

    default:
      return { ...state };
  }
}
