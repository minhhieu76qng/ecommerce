import Axios from 'axios';

export const SET_SIZES = 'SET_SIZES';
export const SET_COLORS = 'SET_COLORS';
export const SET_BRANDS = 'SET_BRANDS';

export function setSizes(sizes) {
  return { type: SET_SIZES, sizes };
}
export function setColors(colors) {
  return { type: SET_COLORS, colors };
}
export function setBrands(brands) {
  return { type: SET_BRANDS, brands };
}

export function fetchSizes() {
  return dispatch => {
    Axios.get('/api/sizes')
      .then(response => {
        dispatch(setSizes(response.data.sizes));
      })
      .catch(err => {});
  };
}

export function fetchBrands() {
  return dispatch => {
    Axios.get('/api/brands')
      .then(response => {
        dispatch(setBrands(response.data.brands));
      })
      .catch(err => {});
  };
}

export function fetchColors() {
  return dispatch => {
    Axios.get('/api/colors')
      .then(response => {
        dispatch(setColors(response.data.colors));
      })
      .catch(err => {});
  };
}
