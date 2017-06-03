export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CLEAN_PRODUCTS = 'CLEAN_PRODUCTS';

export const setProducts = data => ({
  type: SET_PRODUCTS,
  data,
});

export const cleanProducts = data => ({
  type: CLEAN_PRODUCTS,
  data,
});

const initialState = {
  products: [],
};

export default (_state = initialState, action = {}) => {

  let state = { ..._state };

  switch (action.type) {
    case SET_PRODUCTS:  
      state.products = action.data;
      break;
    case CLEAN_PRODUCTS:
      state.products = [];
      break;
    default:
      break;
  }
  return state;
};
