export const SET_USERNAME = 'AUTH_SET_USERNAME';
export const AUTH_CLEAN = 'AUTH_CLEAN';
export const SET_TOKEN = 'AUTH_SET_TOKEN';

export const authSetUsername = data => ({
  type: SET_USERNAME,
  data,
});

export const authClean = () => ({
  type: AUTH_CLEAN,
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
    case AUTH_CLEAN:
      state.username = '';
      state.token = '';
      break;
    case SET_TOKEN:
      state.token = action.data;
      break;
    default:
      break;
  }
  return state;
};
