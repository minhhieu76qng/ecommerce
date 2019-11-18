import {
  SET_SIZES,
  SET_COLORS,
  SET_BRANDS,
} from '../actions/productAttributesAction';

const initialState = {
  sizes: [],
  brands: [],
  colors: [],
};

export default function productAttributes(state = initialState, action) {
  switch (action.type) {
    case SET_BRANDS:
      return { ...state, brands: [...action.brands] };
    case SET_SIZES:
      return { ...state, sizes: [...action.sizes] };
    case SET_COLORS:
      return { ...state, colors: [...action.colors] };
    default:
      return state;
  }
}
