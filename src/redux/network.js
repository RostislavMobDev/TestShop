export const SET_NETWORK_IS_CONNECTED = 'SET_NETWORK_IS_CONNECTED';

export function setNetworkIsConnected(data) {
  return {
    type: SET_NETWORK_IS_CONNECTED,
    data,
  };
}

const initialState = {
  isConnected: false,
};

export default (_state = initialState, action = {}) => {

  let state = { ..._state };
  switch (action.type) {
    case SET_NETWORK_IS_CONNECTED: {
       state.isConnected = action.data;
    }
    default:
      break;
  }
  return state;
};
