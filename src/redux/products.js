export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CLEAN_PRODUCTS = 'CLEAN_PRODUCTS';
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
export const CLEAN_SELECTED_PRODUCTS = 'CLEAN_SELECTED_PRODUCTS';
export const SET_REVIEWS = 'SET_REVIEWS';
export const CLEAN_REVIEWS = 'CLEAN_REVIEWS';

export const setProducts = data => ({
  type: SET_PRODUCTS,
  data,
});

export const cleanProducts = () => ({
  type: CLEAN_PRODUCTS,
});

export const setSelectedProduct = data => ({
  type: SET_SELECTED_PRODUCT,
  data,
});

export const cleanSelectedProduct = () => ({
  type: CLEAN_SELECTED_PRODUCTS,
});

export const setReviews = data => ({
  type: SET_REVIEWS,
  data,
});

export const cleanReviews = () => ({
  type: CLEAN_REVIEWS,
});

const initialState = {
  products: [],
  reviews: [],
  selectedProduct: {},
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
    case SET_SELECTED_PRODUCT:  
      state.selectedProduct = action.data;
      break;
    case CLEAN_SELECTED_PRODUCTS:
      state.selectedProduct = {};
      break;
    case SET_REVIEWS:  
      state.reviews = action.data;
      break;
    case CLEAN_REVIEWS:
      state.reviews = [];
      break;
    default:
      break;
  }
  return state;
};
