import { FETCHED_NAVBAR, FETCHED_ROOT_CATEGORY } from '../actions/categoryAction';

const initialState = {
  navBarMenu: [],
  rootCategory: []
};

export default function navBar(state = initialState, action) {
  switch (action.type) {
    case FETCHED_NAVBAR:
      return { ...state, navBarMenu: action.list };
    case FETCHED_ROOT_CATEGORY:
      return { ...state, rootCategory: action.list };

    default:
      return { ...state };
  }
}
