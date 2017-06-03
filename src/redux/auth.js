export const SET_USERNAME = 'AUTH_SET_USERNAME';
export const CLEAN_USERNAME = 'AUTH_CLEAN_USERNAME';
export const SET_TOKEN = 'AUTH_SET_TOKEN';

export const authSetUsername = data => ({
  type: SET_USERNAME,
  data,
});

export const authCleanUsername = data => ({
  type: CLEAN_USERNAME,
  data,
});

export const authSetToken = data => ({
  type: SET_TOKEN,
  data,
});

const initialState = {
  username: '',
  token: '',
};

export default (_state = initialState, action = {}) => {

  let state = { ..._state };

  switch (action.type) {
    case SET_USERNAME:
      state.username = action.data;
      break;
    case CLEAN_USERNAME:
      state.username = '';
      break;
    case SET_TOKEN:
      state.token = action.data;
      break;
    default:
      break;
  }
  return state;
};
